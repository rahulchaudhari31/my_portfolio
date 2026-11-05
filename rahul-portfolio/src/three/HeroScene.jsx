import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const VIOLET = "#7c3aed";
const CYAN = "#22d3ee";

const SHAPES = [
  {
    type: "icosahedron",
    radius: 4.4,
    speed: 0.16,
    offset: 0.2,
    height: 1.2,
    scale: 0.34,
    color: CYAN,
    wireframe: false,
  },
  {
    type: "torus",
    radius: 5.2,
    speed: -0.1,
    offset: 1.4,
    height: -1.4,
    scale: 0.32,
    color: "#a78bfa",
    wireframe: true,
  },
  {
    type: "octahedron",
    radius: 3.8,
    speed: 0.22,
    offset: 2.8,
    height: 2.2,
    scale: 0.28,
    color: VIOLET,
    wireframe: false,
  },
  {
    type: "icosahedron",
    radius: 5.6,
    speed: -0.14,
    offset: 4.1,
    height: 0.4,
    scale: 0.24,
    color: "#67e8f9",
    wireframe: true,
  },
  {
    type: "torus",
    radius: 4.8,
    speed: 0.19,
    offset: 5.3,
    height: -2.3,
    scale: 0.26,
    color: VIOLET,
    wireframe: false,
  },
  {
    type: "octahedron",
    radius: 6.1,
    speed: -0.08,
    offset: 3.5,
    height: 1.8,
    scale: 0.22,
    color: CYAN,
    wireframe: true,
  },
  {
    type: "icosahedron",
    radius: 4.1,
    speed: 0.12,
    offset: 5.9,
    height: -0.8,
    scale: 0.3,
    color: "#8b5cf6",
    wireframe: false,
  },
];

function createGradientTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 512, 512);
  gradient.addColorStop(0, "#5b21b6");
  gradient.addColorStop(0.35, VIOLET);
  gradient.addColorStop(0.7, "#a78bfa");
  gradient.addColorStop(1, CYAN);

  context.fillStyle = gradient;
  context.fillRect(0, 0, 512, 512);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createGlowTexture() {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;

  const context = canvas.getContext("2d");
  const gradient = context.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
  gradient.addColorStop(0.3, "rgba(196, 181, 253, 0.85)");
  gradient.addColorStop(0.65, "rgba(34, 211, 238, 0.35)");
  gradient.addColorStop(1, "rgba(34, 211, 238, 0)");

  context.fillStyle = gradient;
  context.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function seededRandom(seed) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function DistortedSphere({ active }) {
  const meshRef = useRef(null);
  const gradient = useMemo(() => createGradientTexture(), []);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !active) {
      return;
    }

    mesh.rotation.y += delta * 0.18;
    mesh.rotation.z += delta * 0.04;
  });

  return (
    <group>
      <mesh scale={2.35}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={VIOLET}
          transparent
          opacity={0.07}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={meshRef} scale={1.7}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          map={gradient}
          distort={0.38}
          speed={1.7}
          roughness={0.22}
          metalness={0.4}
          emissive={VIOLET}
          emissiveIntensity={0.12}
        />
      </mesh>
    </group>
  );
}

function Particles({ count = 1500, active }) {
  const pointsRef = useRef(null);
  const glow = useMemo(() => createGlowTexture(), []);

  const positions = useMemo(() => {
    const values = new Float32Array(count * 3);

    for (let index = 0; index < count; index += 1) {
      const radius = 3 + seededRandom(index * 4 + 1) * 6;
      const theta = seededRandom(index * 4 + 2) * Math.PI * 2;
      const phi = Math.acos(2 * seededRandom(index * 4 + 3) - 1);
      const offset = index * 3;

      values[offset] = radius * Math.sin(phi) * Math.cos(theta);
      values[offset + 1] = radius * Math.cos(phi) * 0.8;
      values[offset + 2] = radius * Math.sin(phi) * Math.sin(theta);
    }

    return values;
  }, [count]);

  useFrame((state, delta) => {
    const points = pointsRef.current;
    if (!points || !active) {
      return;
    }

    points.rotation.y -= delta * 0.02;
    points.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        map={glow}
        color="#ffffff"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function ShapeGeometry({ type }) {
  if (type === "torus") {
    return <torusGeometry args={[0.7, 0.25, 8, 16]} />;
  }

  if (type === "octahedron") {
    return <octahedronGeometry args={[0.8, 0]} />;
  }

  return <icosahedronGeometry args={[0.8, 0]} />;
}

function OrbitShape({
  type,
  radius,
  speed,
  offset,
  height,
  scale,
  color,
  wireframe,
  active,
}) {
  const meshRef = useRef(null);
  const angle = useRef(offset);

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !active) {
      return;
    }

    angle.current += delta * speed;
    mesh.position.x = Math.cos(angle.current) * radius;
    mesh.position.z = Math.sin(angle.current) * radius;
    mesh.position.y =
      height + Math.sin(state.clock.elapsedTime * 0.6 + offset) * 0.35;
    mesh.rotation.x += delta * 0.5;
    mesh.rotation.y += delta * 0.35;
  });

  return (
    <mesh ref={meshRef} scale={scale}>
      <ShapeGeometry type={type} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={wireframe ? 0.85 : 0.4}
        metalness={0.65}
        roughness={0.28}
        wireframe={wireframe}
        transparent
        opacity={wireframe ? 0.85 : 0.92}
      />
    </mesh>
  );
}

function OrbitingShapes({ active }) {
  return (
    <group>
      {SHAPES.map((shape, index) => (
        <OrbitShape
          key={`${shape.type}-${index}`}
          {...shape}
          active={active}
        />
      ))}
    </group>
  );
}

function ParallaxGroup({ children, active }) {
  const groupRef = useRef(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const offsetX = size.width >= 1280 ? 1.8 : size.width >= 1024 ? 1.45 : 1.05;

  useEffect(() => {
    if (!active) {
      return undefined;
    }

    const handlePointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [active]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group || !active) {
      return;
    }

    const step = Math.min(delta, 0.1);
    group.rotation.y = THREE.MathUtils.damp(
      group.rotation.y,
      pointer.current.x * 0.24,
      3.5,
      step,
    );
    group.rotation.x = THREE.MathUtils.damp(
      group.rotation.x,
      -pointer.current.y * 0.14,
      3.5,
      step,
    );
  });

  return (
    <group ref={groupRef} position={[offsetX, 0.05, 0]}>
      {children}
    </group>
  );
}

export default function HeroScene({ active = true }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "demand"}
      camera={{ position: [0, 0, 8], fov: 45, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.55} />
        <directionalLight
          position={[4, 5, 6]}
          intensity={1.2}
          color="#ffffff"
        />
        <pointLight
          position={[5, 2, 4]}
          intensity={45}
          distance={20}
          decay={2}
          color={VIOLET}
        />
        <pointLight
          position={[-5, -3, 4]}
          intensity={35}
          distance={20}
          decay={2}
          color={CYAN}
        />

        <ParallaxGroup active={active}>
          <DistortedSphere active={active} />
          <Particles active={active} />
          <OrbitingShapes active={active} />
        </ParallaxGroup>

        <fog attach="fog" args={["#07070d", 10, 22]} />
      </Suspense>
    </Canvas>
  );
}
