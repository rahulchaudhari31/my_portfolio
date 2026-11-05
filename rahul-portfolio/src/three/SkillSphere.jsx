import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { skills } from "../data/content";
import { skillIcons } from "../data/skillIcons";

const techItems = Array.from(
  new Set(skills.flatMap((group) => group.items)),
);

const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));

function distributeOnSphere(count, radius) {
  const points = [];

  for (let index = 0; index < count; index += 1) {
    const y = 1 - (index / Math.max(count - 1, 1)) * 2;
    const ringRadius = Math.sqrt(Math.max(1 - y * y, 0));
    const theta = GOLDEN_ANGLE * index;

    points.push(
      new THREE.Vector3(
        Math.cos(theta) * ringRadius * radius,
        y * radius,
        Math.sin(theta) * ringRadius * radius,
      ),
    );
  }

  return points;
}

function SkillLabel({ item, position, occluderRef }) {
  const Icon = skillIcons[item];

  return (
    <Html
      position={position}
      center
      distanceFactor={7.5}
      occlude={[occluderRef]}
      zIndexRange={[20, 0]}
      wrapperClass="pointer-events-none"
      style={{ pointerEvents: "none" }}
    >
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-ink/80 px-2.5 py-1 text-[10px] font-medium text-slate-200 shadow-lg backdrop-blur-md">
        {Icon ? <Icon className="text-[11px] text-cyan" /> : null}
        <span className="whitespace-nowrap">{item}</span>
      </div>
    </Html>
  );
}

function SphereContent({ paused }) {
  const groupRef = useRef(null);
  const sphereRef = useRef(null);
  const [labelsReady, setLabelsReady] = useState(false);
  const points = useMemo(
    () => distributeOnSphere(techItems.length, 2.75),
    [],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLabelsReady(true), 200);
    return () => window.clearTimeout(timer);
  }, []);

  useFrame((state, delta) => {
    const group = groupRef.current;
    if (!group || paused) {
      return;
    }

    group.rotation.y += delta * 0.18;
    group.rotation.x = Math.sin(state.clock.elapsedTime * 0.22) * 0.08;
  });

  return (
    <group ref={groupRef}>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[2.25, 32, 32]} />
        <meshBasicMaterial
          color="#7c3aed"
          transparent
          opacity={0.1}
          wireframe
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[2.15, 48, 48]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.025} />
      </mesh>

      {labelsReady
        ? techItems.map((item, index) => (
            <SkillLabel
              key={item}
              item={item}
              position={points[index]}
              occluderRef={sphereRef}
            />
          ))
        : null}
    </group>
  );
}

export default function SkillSphere({ active = true }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full w-full"
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
    >
      <Canvas
        dpr={[1, 1.5]}
        frameloop={active ? "always" : "demand"}
        camera={{ position: [0, 0, 7.5], fov: 45, near: 0.1, far: 40 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        style={{ pointerEvents: "auto" }}
      >
        <Suspense fallback={null}>
          <SphereContent paused={hovered || !active} />
        </Suspense>

        <OrbitControls
          enabled={active}
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.65}
          enableDamping
          dampingFactor={0.08}
        />
      </Canvas>
    </div>
  );
}
