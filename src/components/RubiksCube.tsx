import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import RubiksCubeModel from "./RubiksCubeModel";

export default function RubiksCube() {
  const cubeRef = useRef<{ rotateFace: (face: string) => void }>(null);

  return (
    <>
      <Canvas camera={{ position: [6, 6, 6], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <RubiksCubeModel ref={cubeRef} />
        <OrbitControls />
      </Canvas>

      <div style={{ position: "absolute", top: 20, left: 20 }}>
        {["front", "back", "left", "right", "top", "bottom"].map((face) => (
          <button key={face} onClick={() => cubeRef.current?.rotateFace(face)}>
            Rotate {face}
          </button>
        ))}
      </div>
    </>
  );
}
