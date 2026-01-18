import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

function AnimatedSphere({ position, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.3
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.3}
          speed={2}
          roughness={0.1}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  )
}

function FloatingCube({ position, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + position[0]) * 0.2
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial
          color={color}
          metalness={0.9}
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  )
}

function Torus({ position, color, speed = 1 }) {
  const meshRef = useRef()
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.02 * speed
      meshRef.current.rotation.y += 0.01 * speed
      meshRef.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.25
    }
  })

  return (
    <Float speed={speed} rotationIntensity={1.5} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position}>
        <torusGeometry args={[0.6, 0.2, 16, 100]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={0.4}
        />
      </mesh>
    </Float>
  )
}

function Particles({ count = 80 }) {
  const mesh = useRef()
  
  const particles = useMemo(() => {
    const temp = []
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100
      const factor = 20 + Math.random() * 100
      const speed = 0.01 + Math.random() / 200
      const xFactor = -20 + Math.random() * 40
      const yFactor = -20 + Math.random() * 40
      const zFactor = -20 + Math.random() * 40
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor })
    }
    return temp
  }, [count])

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((state) => {
    if (!mesh.current) return
    
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle
      t = particle.t += speed / 2
      const a = Math.cos(t) + Math.sin(t * 1) / 10
      const b = Math.sin(t) + Math.cos(t * 2) / 10
      const s = Math.cos(t) * 0.5 + 0.5
      
      dummy.position.set(
        xFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        yFactor + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        zFactor + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      )
      dummy.scale.set(s * 0.1, s * 0.1, s * 0.1)
      dummy.rotation.set(s * 5, s * 5, s * 5)
      dummy.updateMatrix()
      
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={mesh} args={[null, null, count]}>
      <sphereGeometry args={[0.1, 8, 8]} />
      <meshStandardMaterial color="#8b5cf6" emissive="#6366f1" emissiveIntensity={0.5} />
    </instancedMesh>
  )
}

export default function Scene3D() {
  return (
    <div className="scene-3d">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#ec4899" intensity={0.5} />
        
        <AnimatedSphere position={[-3, 1, 0]} color="#6366f1" speed={0.8} />
        <AnimatedSphere position={[3, -1, 0]} color="#ec4899" speed={1.2} />
        <FloatingCube position={[-1, -2, -2]} color="#8b5cf6" speed={1} />
        <FloatingCube position={[1, 2, -2]} color="#10b981" speed={0.9} />
        <Torus position={[0, 0, -3]} color="#f59e0b" speed={1.1} />
        
        <Particles count={100} />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  )
}
