import {
  useRef,
  useEffect,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import Cubelet from "./Cubelet";
import { faceAxis, faceDirection, faceSelectors, getFaceCenter } from "../utils/rubiksFaces";

const spacing = 1;

const RubiksCubeModel = forwardRef((_, ref) => {
  const fullGroupRef = useRef<Group>(null);
  const rotatingGroupRef = useRef<Group>(null);

  const [positions, setPositions] = useState<[number, number, number][]>([]);
  const [rotationState, setRotationState] = useState<{
    face: string;
    angle: number;
    active: boolean;
  }>({ face: "", angle: 0, active: false });

  useEffect(() => {
    const newPositions: [number, number, number][] = [];
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          newPositions.push([x * spacing, y * spacing, z * spacing]);
        }
      }
    }
    setPositions(newPositions);
  }, []);

  useImperativeHandle(ref, () => ({
    rotateFace: (face: string) => {
      setRotationState({ face, angle: 0, active: true });
      if (rotatingGroupRef.current) {
        rotatingGroupRef.current.rotation.set(0, 0, 0);
      }
    },
  }));

  useFrame((_, delta) => {
    if (!rotationState.active || !rotatingGroupRef.current) return;

    const axis = faceAxis[rotationState.face];
    const direction = faceDirection[rotationState.face];
    const rotationSpeed = (Math.PI / 2) * direction;
    const newAngle = rotationState.angle + rotationSpeed * delta;

    const group = rotatingGroupRef.current;
    group.position.set(...getFaceCenter(rotationState.face)); // <-- key line

    if (Math.abs(newAngle) >= Math.PI / 2) {
      group.rotation[axis] = (Math.PI / 2) * direction;
      setRotationState((prev) => ({ ...prev, active: false }));
    } else {
      group.rotation[axis] = newAngle;
      setRotationState((prev) => ({ ...prev, angle: newAngle }));
    }
  });

  const isInRotatingFace = faceSelectors[rotationState.face] || (() => false);

  return (
    <group ref={fullGroupRef}>
      {/* Static cubelets */}
      {positions
        .filter((pos) => !isInRotatingFace(pos))
        .map((pos, i) => (
          <Cubelet key={`static-${i}`} position={pos} />
        ))}

      {/* Rotating face */}
      <group ref={rotatingGroupRef}>
        {positions
          .filter((pos) => isInRotatingFace(pos))
          .map((pos, i) => {
            return <Cubelet key={`rotating-${i}`} position={pos} />;
          })}
      </group>
    </group>
  );
});

export default RubiksCubeModel;
