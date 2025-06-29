import RubiksCube from "./components/RubiksCube";
import backgroundImage from "./assets/pexels-mdsnmdsnmdsn-1831234.jpg";

export default function App() {
  return (
    <div
      style={{
        height: "100vh",
        width:  "100vw",
        background: `url(${backgroundImage}) no-repeat center / cover fixed`,
      }}
    >
      <RubiksCube />
    </div>
  );
}
