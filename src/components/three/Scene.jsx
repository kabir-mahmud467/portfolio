import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Grid } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

function Particles() {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.5 });

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#adc6ff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0 bg-[#0b1326]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Particles />
        <Grid position={[0, -1, 0]} infiniteGrid fadeDistance={50} sectionColor="#171f33" cellColor="#2d3449" />
      </Canvas>
    </div>
  );
}