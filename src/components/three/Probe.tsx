"use client";

import { useEffect, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { MathUtils, type Group, type Mesh, type MeshStandardMaterial, type Object3D } from "three";

export const PROBE_MODEL = "/models/zondas.glb";

export type PointerTarget = { x: number; y: number };

const BASE_SCALE = 0.82;
const REST_YAW = -0.32; // slight 3/4 view, turned toward the headline
const POINTER_YAW = 0.9;
const INTRO_SECONDS = 1.4;
// The glb carries emissive strength 2.2 (tuned for Cycles). Under ACES tone mapping that washes
// the orange out to peach, so the site drives it lower.
const LENS_GLOW = 1.1;

type ProbeProps = {
  pointer: React.RefObject<PointerTarget>;
  onReady: () => void;
};

export function Probe({ pointer, onReady }: ProbeProps) {
  // Model is meshopt-compressed (see package.json "model" script); Draco is not used.
  const { scene } = useGLTF(PROBE_MODEL, false, true);
  const root = useRef<Group>(null);
  // Three.js objects are mutated every frame, so they live in a ref (not memoised render state).
  const parts = useRef<ProbeParts | null>(null);

  useEffect(() => {
    parts.current = findParts(scene);
    onReady();
  }, [scene, onReady]);

  useFrame((state, delta) => {
    const group = root.current;
    const probe = parts.current;
    if (!group || !probe) return;

    const time = state.clock.elapsedTime;
    const intro = 1 - Math.pow(1 - Math.min(time / INTRO_SECONDS, 1), 3);
    const target = pointer.current;

    // Fly in from below, then hover.
    group.position.y = Math.sin(time * 1.1) * 0.08 - (1 - intro) * 1.4;
    group.scale.setScalar(BASE_SCALE * (0.75 + 0.25 * intro));

    // Whole body turns toward the pointer, the eye turns a little further: it "looks".
    group.rotation.y = MathUtils.damp(group.rotation.y, REST_YAW + target.x * POINTER_YAW, 3, delta);
    group.rotation.x = MathUtils.damp(group.rotation.x, -target.y * 0.22, 3, delta);
    group.rotation.z = Math.sin(time * 0.8) * 0.035;

    if (probe.eye) {
      probe.eye.rotation.y = MathUtils.damp(probe.eye.rotation.y, target.x * 0.3, 5, delta);
      probe.eye.rotation.x = MathUtils.damp(probe.eye.rotation.x, -target.y * 0.25, 5, delta);
    }
    for (const rotor of probe.rotors) rotor.rotation.y += delta * 16;
    if (probe.antenna) probe.antenna.rotation.z = Math.sin(time * 2.4) * 0.07;
    if (probe.lensMaterial) probe.lensMaterial.emissiveIntensity = LENS_GLOW + Math.sin(time * 2) * 0.2;
  });

  return (
    <group ref={root}>
      <primitive object={scene} />
    </group>
  );
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
