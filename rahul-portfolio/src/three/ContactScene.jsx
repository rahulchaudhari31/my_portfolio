import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const VIOLET = "#7c3aed";
const CYAN = "#22d3ee";

function WireKnot({ active }) {
  const knotRef = useRef(null);
  const shellRef = useRef(null);

  useFrame((state, delta) => {
    const knot = knotRef.current;
    const shell = shellRef.current;

    if (!knot || !shell || !active) {
      return;
    }

    knot.rotation.x += delta * 0.12;
    knot.rotation.y += delta * 0.18;
    shell.rotation.x -= delta * 0.05;
    shell.rotation.y -= delta * 0.07;

    shell.position.y = Math.sin(state.clock.elapsedTime * 0.55) * 0.08;
  });

  return (
    <group>
      <mesh ref={knotRef}>
        <torusKnotGeometry args={[1.02, 0.28, 180, 24]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={VIOLET}
          emissiveIntensity={1.6}
          metalness={0.7}
          roughness={0.25}
          wireframe
          transparent
          opacity={0.88}
        />
      </mesh>

      <mesh ref={shellRef} scale={1.24}>
        <icosahedronGeometry args={[1.25, 1]} />
        <meshBasicMaterial
          color={VIOLET}
          wireframe
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.85, 0.008, 6, 120]} />
        <meshBasicMaterial color={CYAN} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function ContactScene({ active = true }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0, 4.8], fov: 42, near: 0.1, far: 20 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <pointLight
          position={[3, 3, 4]}
          intensity={38}
          distance={14}
          decay={2}
          color={CYAN}
        />
        <pointLight
          position={[-3, -2, 3]}
          intensity={32}
          distance={14}
          decay={2}
          color={VIOLET}
        />
        <WireKnot active={active} />
      </Suspense>
    </Canvas>
  );
}
