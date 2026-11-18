"""
Builds the portfolio guide probe ("zondas") from scratch, renders previews and exports a .glb.

Run headless from the repo root:
  blender --background --factory-startup --python blender/zondas.py -- <repo_root> [--skip-renders]

Outputs:
  blender/zondas.blend              editable source
  blender/renders/*.png             preview renders (front 3/4, side, top)
  public/images/zondas-poster.webp  transparent poster for the site (shown before 3D loads)
  public/models/zondas.raw.glb      uncompressed export (compressed later with gltf-transform)

Part names are a contract with the site code (src/components/three):
  Probe (root) > Body, Eye > Lens, Rotor_L, Rotor_R, Antenna
Front of the probe faces Blender -Y, which becomes +Z in glTF / three.js (what Object3D.lookAt aims).
"""

import math
import sys
from pathlib import Path

import bpy
from mathutils import Vector

ARGS = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
ROOT = Path(ARGS[0]).resolve() if ARGS else Path.cwd()
SKIP_RENDERS = "--skip-renders" in ARGS

ACCENT = (0.807, 0.127, 0.045, 1.0)  # #E8643C in linear sRGB


# ---------------------------------------------------------------- scene setup

def reset_scene():
    for obj in list(bpy.data.objects):
        bpy.data.objects.remove(obj, do_unlink=True)
    scene = bpy.context.scene
    scene.unit_settings.system = "METRIC"
    return scene


def ensure_nodes(block):
    # Blender 5 always uses nodes and deprecates the flag; older versions need it switched on.
    if hasattr(block, "use_nodes") and not block.use_nodes:
        block.use_nodes = True


def material(name, color, metallic, roughness, emission=None, emission_strength=0.0):
    mat = bpy.data.materials.new(name)
    ensure_nodes(mat)
    bsdf = mat.node_tree.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = color
    bsdf.inputs["Metallic"].default_value = metallic
    bsdf.inputs["Roughness"].default_value = roughness
    if emission:
        bsdf.inputs["Emission Color"].default_value = emission
        bsdf.inputs["Emission Strength"].default_value = emission_strength
    return mat


def make_materials():
    return {
        # Polished, slightly cool steel. Reflections come from the environment.
        "Metal": material("Metal", (0.78, 0.80, 0.83, 1.0), 1.0, 0.16),
        # Dark anodised graphite for trims, ducts and the eye bezel ring.
        "Trim": material("Trim", (0.018, 0.02, 0.024, 1.0), 0.7, 0.38),
        # Emissive orange: the eye and the antenna tip.
        # Strength kept low so the orange does not clip to yellow-white.
        "Glow": material("Glow", ACCENT, 0.0, 0.3, emission=ACCENT, emission_strength=2.2),
    }


# ---------------------------------------------------------------- helpers

def active():
    return bpy.context.view_layer.objects.active


def select_only(*objects):
    bpy.ops.object.select_all(action="DESELECT")
    for obj in objects:
        obj.select_set(True)
    bpy.context.view_layer.objects.active = objects[0]


def finish(obj, name, mat, smooth=True):
    """Name it, assign one material, bake rotation/scale into the mesh."""
    obj.name = name
    obj.data.name = name
    obj.data.materials.clear()
    obj.data.materials.append(mat)
    select_only(obj)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    if smooth:
        bpy.ops.object.shade_smooth()
    return obj


def join(objects, name):
    select_only(*objects)
    bpy.ops.object.join()
    obj = active()
    obj.name = name
    obj.data.name = name
    return obj


def set_origin(obj, point):
    bpy.context.scene.cursor.location = point
    select_only(obj)
    bpy.ops.object.origin_set(type="ORIGIN_CURSOR")
    bpy.context.scene.cursor.location = (0, 0, 0)


def parent(child, new_parent):
    world = child.matrix_world.copy()
    child.parent = new_parent
    child.matrix_world = world


# ---------------------------------------------------------------- geometry

def build_body(mats):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=40, ring_count=20, radius=1.0)
    shell = finish(active(), "Shell", mats["Metal"])
    shell.scale = (1.0, 1.0, 0.82)
    finish(shell, "Shell", mats["Metal"])

    # Equator band: a dark trim ring that reads well in both themes.
    bpy.ops.mesh.primitive_torus_add(major_radius=1.0, minor_radius=0.055, major_segments=48, minor_segments=8)
    band = finish(active(), "Band", mats["Trim"])

    # Short arms out to the rotor ducts.
    arms = []
    for side in (-1, 1):
        # Ends at the duct's inner wall (x≈1.5) so it never crosses the spinning blades.
        bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.07, depth=0.6, location=(side * 1.215, 0, 0), rotation=(0, math.pi / 2, 0))
        arms.append(finish(active(), f"Arm_{side}", mats["Metal"]))

    # Ducts around the rotors (horizontal rings).
    ducts = []
    for side in (-1, 1):
        bpy.ops.mesh.primitive_torus_add(major_radius=0.43, minor_radius=0.075, major_segments=40, minor_segments=8, location=(side * 1.95, 0, 0))
        ducts.append(finish(active(), f"Duct_{side}", mats["Trim"]))

    # Rear thruster nub so the back is not empty when the probe turns.
    bpy.ops.mesh.primitive_cylinder_add(vertices=24, radius=0.28, depth=0.18, location=(0, 0.95, 0), rotation=(math.pi / 2, 0, 0))
    nub = finish(active(), "Nub", mats["Trim"])

    body = join([shell, band, *arms, *ducts, nub], "Body")
    set_origin(body, (0, 0, 0))
    return body


def build_eye(mats):
    # The shell's front surface is at y = -1 (y ≈ -0.91 at the bezel's radius).
    # Bezel ring sits on it, iris just inside, lens bulges out. The eye is large on purpose: it is the character.
    bpy.ops.mesh.primitive_torus_add(major_radius=0.44, minor_radius=0.085, major_segments=48, minor_segments=10, location=(0, -0.96, 0.02), rotation=(math.pi / 2, 0, 0))
    bezel = finish(active(), "Bezel", mats["Metal"])
    # Dark iris disc behind the lens so the glow has contrast.
    bpy.ops.mesh.primitive_cylinder_add(vertices=40, radius=0.4, depth=0.07, location=(0, -0.94, 0.02), rotation=(math.pi / 2, 0, 0))
    iris = finish(active(), "Iris", mats["Trim"])
    eye = join([bezel, iris], "Eye")
    set_origin(eye, (0, -0.96, 0.02))

    bpy.ops.mesh.primitive_uv_sphere_add(segments=28, ring_count=14, radius=0.25, location=(0, -0.99, 0.02))
    lens = active()
    lens.scale = (1.0, 0.5, 1.0)
    finish(lens, "Lens", mats["Glow"])
    parent(lens, eye)
    return eye, lens


def build_rotor(mats, side):
    center = Vector((side * 1.95, 0, 0.0))
    blades = []
    for index in range(3):
        angle = index * (2 * math.pi / 3)
        # Blade spans 0.05–0.35 from the hub; the duct's inner wall is at 0.355.
        offset = Vector((math.cos(angle), math.sin(angle), 0)) * 0.2
        bpy.ops.mesh.primitive_cube_add(size=1.0, location=center + offset, rotation=(0.25, 0, angle))
        blade = active()
        blade.scale = (0.3, 0.07, 0.012)
        blades.append(finish(blade, f"Blade_{side}_{index}", mats["Metal"], smooth=False))
    bpy.ops.mesh.primitive_cylinder_add(vertices=16, radius=0.07, depth=0.08, location=center)
    hub = finish(active(), f"Hub_{side}", mats["Trim"])
    rotor = join([hub, *blades], "Rotor_L" if side < 0 else "Rotor_R")
    set_origin(rotor, center)
    return rotor


def build_antenna(mats):
    bpy.ops.mesh.primitive_cylinder_add(vertices=10, radius=0.018, depth=0.55, location=(0.25, 0.1, 0.98))
    mast = finish(active(), "Mast", mats["Metal"])
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=8, radius=0.05, location=(0.25, 0.1, 1.27))
    tip = finish(active(), "Tip", mats["Glow"])
    antenna = join([mast, tip], "Antenna")
    set_origin(antenna, (0.25, 0.1, 0.72))  # pivot at the base so code can wobble it
    return antenna


def build_probe():
    mats = make_materials()
    root = bpy.data.objects.new("Probe", None)
    bpy.context.scene.collection.objects.link(root)

    body = build_body(mats)
    eye, _lens = build_eye(mats)
    rotors = [build_rotor(mats, -1), build_rotor(mats, 1)]
    antenna = build_antenna(mats)

    for part in (body, eye, *rotors, antenna):
        parent(part, root)
    return root


def triangle_count(root):
    total = 0
    for obj in [root, *root.children_recursive]:
        if obj.type == "MESH":
            obj.data.calc_loop_triangles()
            total += len(obj.data.loop_triangles)
    return total


# ---------------------------------------------------------------- render

def setup_render(scene, transparent):
    scene.render.engine = "CYCLES"
    scene.cycles.device = "CPU"
    scene.cycles.samples = 64
    scene.cycles.use_denoising = True
    scene.render.film_transparent = transparent
    scene.view_settings.view_transform = "Standard"

    world = bpy.data.worlds.new("World")
    scene.world = world
    ensure_nodes(world)
    background = world.node_tree.nodes["Background"]
    background.inputs["Color"].default_value = (0.0044, 0.0048, 0.0058, 1.0)  # #0E0F11
    background.inputs["Strength"].default_value = 1.0

    def area(name, location, size, energy, color=(1, 1, 1)):
        light = bpy.data.lights.new(name, "AREA")
        light.size = size
        light.energy = energy
        light.color = color
        obj = bpy.data.objects.new(name, light)
        scene.collection.objects.link(obj)
        obj.location = location
        aim(obj, (0, 0, 0))
        return obj

    area("Key", (-3.5, -4.0, 4.0), 4.0, 900)
    area("Fill", (4.5, -2.5, 1.0), 5.0, 250)
    area("Rim", (2.5, 4.5, 2.0), 3.0, 900, color=(1.0, 0.42, 0.24))

    # Light cards: invisible to the camera, give the polished metal long strip reflections
    # (the site recreates these with drei <Lightformer>).
    cards = (
        ("CardTop", (0, -1.0, 4.5), (5, 1.2, 1)),
        ("CardSide", (-4.5, -1.5, 0.5), (1.0, 4, 1)),
        ("CardFloor", (0.5, -1.5, -4.0), (6, 2.0, 1)),  # soft bounce so the underside is not pitch black
    )
    for name, location, scale in cards:
        bpy.ops.mesh.primitive_plane_add(size=1.0, location=location)
        card = active()
        card.name = name
        card.scale = scale
        aim(card, (0, 0, 0), track="Z")
        mat = material(f"{name}Mat", (1, 1, 1, 1), 0.0, 1.0, emission=(1, 1, 1, 1), emission_strength=3.0)
        card.data.materials.append(mat)
        card.visible_camera = False


def aim(obj, target, track="-Z"):
    direction = Vector(target) - obj.location
    obj.rotation_euler = direction.to_track_quat(track, "Y").to_euler()


def camera(scene, location, lens=55):
    cam_data = bpy.data.cameras.new("Camera")
    cam_data.lens = lens
    cam = bpy.data.objects.new("Camera", cam_data)
    scene.collection.objects.link(cam)
    cam.location = location
    aim(cam, (0, 0, 0.1))
    scene.camera = cam
    return cam


def render(scene, path, size):
    scene.render.resolution_x = size
    scene.render.resolution_y = size
    scene.render.filepath = str(path)
    bpy.ops.render.render(write_still=True)


def main():
    scene = reset_scene()
    root = build_probe()
    print(f"[zondas] triangles: {triangle_count(root)}")

    blend_dir = ROOT / "blender"
    (blend_dir / "renders").mkdir(parents=True, exist_ok=True)
    (ROOT / "public" / "models").mkdir(parents=True, exist_ok=True)
    (ROOT / "public" / "images").mkdir(parents=True, exist_ok=True)

    # Export first, before render helpers add lights and cards to the scene.
    select_only(root, *root.children_recursive)
    bpy.ops.export_scene.gltf(
        filepath=str(ROOT / "public" / "models" / "zondas.raw.glb"),
        export_format="GLB",
        use_selection=True,
        export_yup=True,
        export_apply=True,
        export_cameras=False,
        export_lights=False,
        export_animations=False,
    )

    if not SKIP_RENDERS:
        setup_render(scene, transparent=False)
        cam = camera(scene, (-3.0, -6.2, 2.2))
        scene.render.image_settings.file_format = "PNG"
        for name, location in (("front34", (-3.0, -6.2, 2.2)), ("side", (6.8, 0.0, 0.9)), ("top", (-1.4, -2.9, 6.4))):
            cam.location = location
            aim(cam, (0, 0, 0.1))
            render(scene, blend_dir / "renders" / f"{name}.png", 900)

        scene.render.film_transparent = True
        scene.render.image_settings.file_format = "WEBP"
        scene.render.image_settings.color_mode = "RGBA"
        scene.render.image_settings.quality = 82
        cam.location = (-3.3, -8.2, 2.2)  # far enough that both rotors stay in frame
        aim(cam, (0, 0, 0.1))
        render(scene, ROOT / "public" / "images" / "zondas-poster.webp", 1000)

    bpy.ops.wm.save_as_mainfile(filepath=str(blend_dir / "zondas.blend"))
    print("[zondas] done")


main()
