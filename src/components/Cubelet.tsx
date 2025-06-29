import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

// Path to your rounded cube .glb model (should be in /public or imported properly)
const MODEL_PATH = "src/models/cube_with_faces.glb";

const faceColors: Record<string, string> = {
  front: "#FFBE0B", // z === -1
  back: "#FB5607", // z === 1
  left: "#FF006E", // x === -1
  right: "#8338EC", // x === 1
  top: "#FFFFFF", // y === 1
  bottom: "#3A86FF", // y === -1
};

export default function Cubelet({
  position,
}: {
  position: [number, number, number];
}) {
  const gltf = useGLTF(MODEL_PATH);
  const [x, y, z] = position;

  const cubeletColor = useMemo(() => {
    if (x === 1) return faceColors.right;
    if (x === -1) return faceColors.left;
    if (y === 1) return faceColors.top;
    if (y === -1) return faceColors.bottom;
    if (z === 1) return faceColors.back;
    if (z === -1) return faceColors.front;
    return "black";
  }, [x, y, z]);

  const mesh = useMemo(() => {
    const clone = gltf.scene.clone(true);
    clone.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: cubeletColor,
          metalness: 0.2,
          roughness: 0.3,
          emissive: new THREE.Color(cubeletColor),
          emissiveIntensity: 0.8,
        });
      }
    });
    return clone;
  }, [gltf, cubeletColor]);

  // Wrap the GLB model in a positioned group
  return (
    <group position={position}>
      <primitive object={mesh} scale={[19, 19, 19]} />
    </group>
  );
}

useGLTF.preload(MODEL_PATH);
