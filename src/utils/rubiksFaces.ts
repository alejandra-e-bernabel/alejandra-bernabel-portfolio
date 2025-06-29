const spacing = 0;

export const faceSelectors: Record<string, (pos: [number, number, number]) => boolean> = {
  front: ([, , z]) => z === -1,
  back: ([, , z]) => z === 1,
  left: ([x]) => x === -1,
  right: ([x]) => x === 1,
  top: ([, y]) => y === 1,
  bottom: ([, y]) => y === -1,
};

export const faceAxis: Record<string, "x" | "y" | "z"> = {
  front: "z",   // this should be "y"
  back: "z",    // this should be "y"
  left: "x",    // this should be "y"
  right: "x",   // this should be "y"
  top: "y",     // this should be "x"
  bottom: "y",  // this should be "x"
};


export const faceDirection: Record<string, 1 | -1> = {
  front: 1,
  back: -1,
  left: -1,
  right: 1,
  top: 1,
  bottom: -1,
};

export function getFaceCenter(face: string): [number, number, number] {
  switch (face) {
    case "front": return [0, 0, -spacing];
    case "back": return [0, 0, spacing];
    case "left": return [-spacing, 0, 0];
    case "right": return [spacing, 0, 0];
    case "top": return [0, spacing, 0];
    case "bottom": return [0, -spacing, 0];
    default: return [0, 0, 0];
  }
}
