'use client';
import { useEffect, useRef, useState, type MutableRefObject, type ReactNode } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, PerformanceMonitor } from '@react-three/drei';
import { useReducedMotion } from 'framer-motion';
import * as THREE from 'three';

/** Pointer position in -1..1 screen space, tracked on the window so it works across the whole hero. */
function usePointer() {
  const pointer = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return pointer;
}

/**
 * Turns its children a little toward the cursor, with a slow idle sway so touch
 * devices (which have no cursor) still feel alive. Nearer layers get a larger
 * `strength` than distant ones, which is what sells the depth.
 */
function ParallaxRig({
  pointer,
  strength,
  children,
}: {
  pointer: MutableRefObject<{ x: number; y: number }>;
  strength: number;
  children: ReactNode;
}) {
  const ref = useRef<THREE.Group>(null!);
  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const targetY = pointer.current.x * strength + Math.sin(t * 0.25) * 0.04;
    const targetX = pointer.current.y * strength * 0.7 + Math.cos(t * 0.2) * 0.03;
    ref.current.rotation.y = THREE.MathUtils.damp(ref.current.rotation.y, targetY, 2.5, delta);
    ref.current.rotation.x = THREE.MathUtils.damp(ref.current.rotation.x, targetX, 2.5, delta);
  });
  return <group ref={ref}>{children}</group>;
}

function GlowCore() {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mat = ref.current.material as THREE.MeshStandardMaterial;
    mat.emissiveIntensity = 0.25 + Math.sin(t * 1.4) * 0.12;
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[1.7, 32, 32]} />
      <meshStandardMaterial
        color="#2d0a5e"
        emissive="#7C3AED"
        emissiveIntensity={0.25}
        transparent
        opacity={0.18}
        roughness={0}
        metalness={1}
      />
    </mesh>
  );
}

function Ring({
  rotation,
  color,
  radius,
  speed,
  opacity = 0.65,
}: {
  rotation: [number, number, number];
  color: string;
  radius: number;
  speed: number;
  opacity?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((_, delta) => {
    // Speeds are radians per frame at 60fps; scale by real elapsed time so 120Hz screens don't spin 2x.
    ref.current.rotation.z += speed * Math.min(delta, 0.05) * 60;
  });
  return (
    <mesh ref={ref} rotation={new THREE.Euler(...rotation)}>
      <torusGeometry args={[radius, 0.014, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={opacity} />
    </mesh>
  );
}

function OrbitingParticle({
  radius,
  speed,
  offset,
  yTilt,
  color,
  size = 0.065,
}: {
  radius: number;
  speed: number;
  offset: number;
  yTilt: number;
  color: string;
  size?: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed + offset;
    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.y = Math.sin(t) * radius * Math.cos(yTilt);
    ref.current.position.z = Math.sin(t) * radius * Math.sin(yTilt);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.8} />
    </mesh>
  );
}

function FloatingGem({
  position,
  color,
}: {
  position: [number, number, number];
  color: string;
}) {
  return (
    <Float speed={2.5} rotationIntensity={1.2} floatIntensity={0.6} position={position}>
      <mesh>
        <octahedronGeometry args={[0.17, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.9}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

function PulseRing({ radius, speed }: { radius: number; speed: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    const scale = 1 + Math.sin(t) * 0.08;
    ref.current.scale.setScalar(scale);
    (ref.current.material as THREE.MeshBasicMaterial).opacity = 0.15 + Math.sin(t) * 0.08;
  });
  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, 0.025, 8, 100]} />
      <meshBasicMaterial color="#7C3AED" transparent opacity={0.15} />
    </mesh>
  );
}

function Scene() {
  const pointer = usePointer();

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[6, 6, 5]} intensity={6} color="#7C3AED" />
      <pointLight position={[-6, -4, 5]} intensity={3} color="#06B6D4" />
      <pointLight position={[0, 0, 5]} intensity={2.5} color="#8B5CF6" />

      {/* Far layer barely moves; near layer moves most */}
      <ParallaxRig pointer={pointer} strength={0.04}>
        <Stars radius={100} depth={50} count={1800} factor={4} saturation={0} fade speed={0.5} />
      </ParallaxRig>

      <ParallaxRig pointer={pointer} strength={0.16}>
        <GlowCore />
        <PulseRing radius={2.0} speed={0.8} />
        <PulseRing radius={2.4} speed={-0.6} />

        {/* Multi-angle orbiting rings */}
        <Ring rotation={[0.3, 0, 0]} color="#7C3AED" radius={2.3} speed={0.003} />
        <Ring rotation={[1.2, 0.3, 0]} color="#06B6D4" radius={2.9} speed={-0.002} />
        <Ring rotation={[0.7, 1.0, 0.4]} color="#8B5CF6" radius={3.5} speed={0.0018} />
        <Ring rotation={[1.5, 0.5, 1.0]} color="#22D3EE" radius={4.0} speed={-0.0012} opacity={0.45} />
        <Ring rotation={[0.2, 1.5, 0.8]} color="#A78BFA" radius={4.6} speed={0.0009} opacity={0.3} />

        {/* Orbiting particles on ring paths */}
        <OrbitingParticle radius={2.3} speed={1.2} offset={0} yTilt={0.4} color="#A78BFA" />
        <OrbitingParticle radius={2.3} speed={1.2} offset={Math.PI} yTilt={0.4} color="#7C3AED" />
        <OrbitingParticle radius={2.9} speed={-0.85} offset={1.5} yTilt={1.1} color="#06B6D4" />
        <OrbitingParticle radius={2.9} speed={-0.85} offset={4.5} yTilt={1.1} color="#22D3EE" />
        <OrbitingParticle radius={3.5} speed={1.0} offset={3} yTilt={0.9} color="#8B5CF6" />
        <OrbitingParticle radius={3.5} speed={1.0} offset={0.5} yTilt={2.0} color="#A78BFA" size={0.05} />

        {/* Floating gems in background */}
        <FloatingGem position={[-3.8, 1.8, -1.5]} color="#7C3AED" />
        <FloatingGem position={[3.5, -2.0, -0.8]} color="#06B6D4" />
        <FloatingGem position={[-2.2, -3.0, 1.2]} color="#A78BFA" />
        <FloatingGem position={[2.8, 2.5, -2.0]} color="#22D3EE" />
        <FloatingGem position={[-4.2, -0.8, 0.8]} color="#8B5CF6" />
        <FloatingGem position={[1.2, 3.8, -1.5]} color="#7C3AED" />
        <FloatingGem position={[3.8, 0.5, 1.0]} color="#A78BFA" />
        <FloatingGem position={[-1.5, 3.2, -0.5]} color="#06B6D4" />
      </ParallaxRig>
    </>
  );
}

export default function Hero3D() {
  // "demand" renders a single still frame and then stops the loop, so visitors who
  // ask for reduced motion get the scene without anything moving. The same trick
  // stops the GPU working once the hero has scrolled out of view.
  const reduceMotion = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(true);
  const [dpr, setDpr] = useState(1.5);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { rootMargin: '120px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrap} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 42 }}
        dpr={dpr}
        frameloop={reduceMotion || !visible ? 'demand' : 'always'}
      >
        {/* On a slow GPU, drop the resolution instead of dropping frames. */}
        <PerformanceMonitor onDecline={() => setDpr(1)} onIncline={() => setDpr(1.5)} flipflops={3} onFallback={() => setDpr(1)} />
        <Scene />
      </Canvas>
    </div>
  );
}
