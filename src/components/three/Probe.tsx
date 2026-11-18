"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group, type Mesh, type MeshStandardMaterial, type Object3D, type PerspectiveCamera } from "three";

export const PROBE_MODEL = "/models/zondas.glb";

/** Raw pointer position in CSS pixels; active once the user has moved the pointer. */
export type PointerState = { x: number; y: number; active: boolean };

const MODEL_WIDTH = 4.9; // x extent of the glb (rotor to rotor)
const FILL = 0.92; // share of the anchor width the probe occupies
const FLIGHT_LAMBDA = 3.2; // higher = snappier flight between anchors
const ACTIVE_LINE = 0.5; // a section becomes active when its top passes this share of the viewport
const POINTER_YAW = 0.9;
const LENS_GLOW = 1.1; // glb carries 2.2 (tuned for Cycles); ACES washes that to peach

type ProbeProps = {
  pointer: React.RefObject<PointerState>;
  onReady: () => void;
};

export function Probe({ pointer, onReady }: ProbeProps) {
  // Model is meshopt-compressed (see package.json "model" script); Draco is not used.
  const { scene } = useGLTF(PROBE_MODEL, false, true);
  const flight = useRef<Group>(null); // follows the active anchor, banks while moving
  const body = useRef<Group>(null); // hover, sway and looking at the pointer
  // Three.js objects are mutated every frame, so they live in refs rather than render state.
  const parts = useRef<ProbeParts | null>(null);
  const anchors = useRef<Anchor[]>([]);
  const started = useRef(false);

  useEffect(() => {
    parts.current = findParts(scene);
    onReady();
  }, [scene, onReady]);

  useEffect(() => {
    const collect = () => {
      anchors.current = collectAnchors();
    };
    collect();
    window.addEventListener("resize", collect);
    return () => window.removeEventListener("resize", collect);
  }, []);

  useFrame((state, delta) => {
    const flightGroup = flight.current;
    const bodyGroup = body.current;
    const probe = parts.current;
    const anchor = pickAnchor(anchors.current);
    if (!flightGroup || !bodyGroup || !probe || !anchor) return;

    // Anchor rect (CSS px) → world units on the z = 0 plane.
    const { width, height } = state.size;
    const camera = state.camera as PerspectiveCamera;
    const viewHeight = 2 * camera.position.z * Math.tan(MathUtils.degToRad(camera.fov / 2));
    const viewWidth = viewHeight * (width / height);
    const rect = anchor.element.getBoundingClientRect();
    const targetX = ((rect.left + rect.width / 2) / width - 0.5) * viewWidth;
    const targetY = -((rect.top + rect.height / 2) / height - 0.5) * viewHeight;
    const targetScale = ((rect.width / width) * viewWidth * FILL) / MODEL_WIDTH;

    // First frame: start below the screen so the probe flies in.
    if (!started.current) {
      flightGroup.position.set(targetX, -viewHeight * 0.75, 0);
      flightGroup.scale.setScalar(targetScale * 0.6);
      started.current = true;
    }

    const previousX = flightGroup.position.x;
    const previousY = flightGroup.position.y;
    flightGroup.position.x = MathUtils.damp(previousX, targetX, FLIGHT_LAMBDA, delta);
    flightGroup.position.y = MathUtils.damp(previousY, targetY, FLIGHT_LAMBDA, delta);
    flightGroup.scale.setScalar(MathUtils.damp(flightGroup.scale.x, targetScale, FLIGHT_LAMBDA, delta));

    // Bank into the direction of travel.
    const step = Math.max(delta, 1 / 240);
    const velocityX = (flightGroup.position.x - previousX) / step;
    const velocityY = (flightGroup.position.y - previousY) / step;
    const speed = Math.hypot(velocityX, velocityY);
    flightGroup.rotation.z = MathUtils.damp(flightGroup.rotation.z, MathUtils.clamp(-velocityX * 0.08, -0.6, 0.6), 6, delta);
    flightGroup.rotation.x = MathUtils.damp(flightGroup.rotation.x, MathUtils.clamp(velocityY * 0.05, -0.4, 0.4), 6, delta);

    // Pointer relative to where the probe currently is on screen.
    const screenX = (flightGroup.position.x / viewWidth + 0.5) * width;
    const screenY = (0.5 - flightGroup.position.y / viewHeight) * height;
    const look = pointer.current.active
      ? {
          x: MathUtils.clamp((pointer.current.x - screenX) / (width / 2), -1, 1),
          y: MathUtils.clamp(-(pointer.current.y - screenY) / (height / 2), -1, 1),
        }
      : { x: 0, y: 0 };

    const time = state.clock.elapsedTime;
    bodyGroup.position.y = Math.sin(time * 1.1) * 0.12;
    bodyGroup.rotation.y = MathUtils.damp(bodyGroup.rotation.y, anchor.yaw + look.x * POINTER_YAW, 3, delta);
    bodyGroup.rotation.x = MathUtils.damp(bodyGroup.rotation.x, anchor.pitch - look.y * 0.22, 3, delta);
    bodyGroup.rotation.z = Math.sin(time * 0.8) * 0.035;

    if (probe.eye) {
      probe.eye.rotation.y = MathUtils.damp(probe.eye.rotation.y, look.x * 0.3, 5, delta);
      probe.eye.rotation.x = MathUtils.damp(probe.eye.rotation.x, -look.y * 0.25, 5, delta);
    }
    const rotorSpeed = 16 + Math.min(speed, 6) * 5; // rotors spin up while flying
    for (const rotor of probe.rotors) rotor.rotation.y += delta * rotorSpeed;
    if (probe.antenna) probe.antenna.rotation.z = Math.sin(time * 2.4) * 0.07 - velocityX * 0.02;
    if (probe.lensMaterial) probe.lensMaterial.emissiveIntensity = LENS_GLOW + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={flight}>
      <group ref={body}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

type Anchor = { element: HTMLElement; section: HTMLElement; yaw: number; pitch: number };

function collectAnchors(): Anchor[] {
  return Array.from(document.querySelectorAll<HTMLElement>("[data-probe-anchor]")).map((element) => ({
    element,
    section: element.closest("section") ?? element,
    yaw: Number(element.dataset.probeYaw ?? -0.32),
    pitch: Number(element.dataset.probePitch ?? 0),
  }));
}

/** The last anchor (in page order) whose section top has passed the active line. */
function pickAnchor(anchors: Anchor[]): Anchor | undefined {
  const line = window.innerHeight * ACTIVE_LINE;
  let chosen: Anchor | undefined;
  for (const anchor of anchors) {
    if (anchor.element.offsetWidth === 0) continue; // hidden at this breakpoint
    if (!chosen || anchor.section.getBoundingClientRect().top <= line) chosen = anchor;
  }
  return chosen;
}

type ProbeParts = {
  eye?: Object3D;
  rotors: Object3D[];
  antenna?: Object3D;
  lensMaterial?: MeshStandardMaterial;
};

/** Part names are the contract with blender/zondas.py. */
function findParts(scene: Object3D): ProbeParts {
  const lens = scene.getObjectByName("Lens") as Mesh | undefined;
  return {
    eye: scene.getObjectByName("Eye"),
    rotors: ["Rotor_L", "Rotor_R"]
      .map((name) => scene.getObjectByName(name))
      .filter((part): part is Object3D => Boolean(part)),
    antenna: scene.getObjectByName("Antenna"),
    lensMaterial: lens?.material as MeshStandardMaterial | undefined,
  };
}

useGLTF.preload(PROBE_MODEL, false, true);
