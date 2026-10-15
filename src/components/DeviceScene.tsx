import { Canvas, useLoader, useThree } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { SRGBColorSpace, TextureLoader } from "three";
import { useTheme } from "../context/theme";
function Devices({
  project,
  rotation,
}: {
  project: string;
  rotation: [number, number];
}) {
  const { theme } = useTheme();
  const invalidate = useThree((state) => state.invalidate);
  const [desktop, mobile] = useLoader(TextureLoader, [
    `${import.meta.env.BASE_URL}images/screens/${project}-desktop.webp`,
    `${import.meta.env.BASE_URL}images/screens/${project}-mobile.webp`,
  ]);
  useEffect(() => {
    desktop.colorSpace = mobile.colorSpace = SRGBColorSpace;
    desktop.needsUpdate = mobile.needsUpdate = true;
    desktop.anisotropy = mobile.anisotropy = 4;
    invalidate();
  }, [desktop, mobile, invalidate]);
  useEffect(() => {
    // A theme change can clear the composited WebGL frame while the canvas
    // is otherwise idle in demand rendering mode.
    invalidate();
  }, [theme, invalidate]);
  return (
    <group
      rotation={[rotation[0] * 0.12, -0.17 + rotation[1] * 0.3, -0.025]}
      position={[-0.35, 0.15, 0]}
    >
      <group position={[-0.4, 0, 0]}>
        <mesh>
          <boxGeometry args={[3.96, 2.56, 0.13]} />
          <meshStandardMaterial
            color="#202c43"
            metalness={0.65}
            roughness={0.32}
          />
        </mesh>
        <mesh position={[0, 0, 0.071]}>
          <planeGeometry args={[3.72, 2.325]} />
          <meshBasicMaterial map={desktop} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.225, 0.08]}>
          <circleGeometry args={[0.022, 12]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>
        <group position={[0, -1.32, 0.8]}>
          <mesh>
            <boxGeometry args={[4.16, 0.1, 1.75]} />
            <meshStandardMaterial
              color="#9aaabe"
              metalness={0.65}
              roughness={0.4}
            />
          </mesh>
          <mesh position={[0, 0.057, -0.25]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[3.55, 0.75]} />
            <meshStandardMaterial color="#273348" />
          </mesh>
          {Array.from({ length: 4 }, (_, i) => (
            <mesh
              key={i}
              position={[0, 0.061, -0.52 + i * 0.18]}
              rotation={[-Math.PI / 2, 0, 0]}
            >
              <planeGeometry args={[3.45, 0.018]} />
              <meshBasicMaterial color="#64748b" />
            </mesh>
          ))}
          <mesh position={[0, 0.057, 0.5]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[1.1, 0.45]} />
            <meshStandardMaterial color="#b5c2d2" />
          </mesh>
        </group>
      </group>
      <group position={[2.25, -0.1, 0.55]} rotation={[0, 0.08, 0.025]}>
        <mesh>
          <boxGeometry args={[1.15, 2.43, 0.14]} />
          <meshStandardMaterial
            color="#1c2940"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0, 0.076]}>
          <planeGeometry args={[1.02, 2.207]} />
          <meshBasicMaterial map={mobile} toneMapped={false} />
        </mesh>
        <mesh position={[0, 1.163, 0.08]}>
          <boxGeometry args={[0.23, 0.016, 0.005]} />
          <meshBasicMaterial color="#64748b" />
        </mesh>
      </group>
    </group>
  );
}
export default function DeviceScene({
  project,
  rotation,
  active,
}: {
  project: string;
  rotation: [number, number];
  active: boolean;
}) {
  return (
    <Canvas
      className="device-canvas"
      frameloop={active ? "demand" : "never"}
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.1, 7], fov: 32 }}
      gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
      aria-hidden="true"
    >
      <ambientLight intensity={1.5} />
      <directionalLight position={[2, 5, 5]} intensity={3} />
      <directionalLight position={[-4, 0, 2]} intensity={1} color="#93c5fd" />
      <Suspense fallback={null}>
        <Devices project={project} rotation={rotation} />
      </Suspense>
    </Canvas>
  );
}
