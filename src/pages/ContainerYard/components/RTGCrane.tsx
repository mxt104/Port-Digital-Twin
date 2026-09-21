import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { Group } from 'three'
import type { RTGEquipment } from '@/data/equipment'

interface RTGCraneProps {
  equipment: RTGEquipment
}

export default function RTGCrane({ equipment }: RTGCraneProps) {
  const groupRef = useRef<Group>(null)

  useFrame((state) => {
    if (!groupRef.current || equipment.status !== 'active') return

    groupRef.current.position.y =
      0.05 + Math.sin(state.clock.elapsedTime * 2) * 0.02
  })

  const statusColor =
    equipment.status === 'active'
      ? '#22c55e'
      : equipment.status === 'idle'
        ? '#f59e0b'
        : '#ef4444'

  return (
    <group
      ref={groupRef}
      position={[equipment.x, 0, equipment.z]}
    >
      {/* ================= RTG FRAME ================= */}

      {/* Left leg */}
      <mesh position={[-2.8, 3, 0]} castShadow>
        <boxGeometry args={[0.35, 6, 0.45]} />
        <meshStandardMaterial
          color="#374151"
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>

      {/* Right leg */}
      <mesh position={[2.8, 3, 0]} castShadow>
        <boxGeometry args={[0.35, 6, 0.45]} />
        <meshStandardMaterial
          color="#374151"
          roughness={0.7}
          metalness={0.6}
        />
      </mesh>

      {/* Top beam */}
      <mesh position={[0, 6, 0]} castShadow>
        <boxGeometry args={[6, 0.4, 0.5]} />
        <meshStandardMaterial
          color="#4b5563"
          roughness={0.65}
          metalness={0.7}
        />
      </mesh>

      {/* ================= CROSS BRACING ================= */}

      <mesh
        position={[-1.4, 3, 0]}
        rotation={[0, 0, -0.45]}
      >
        <boxGeometry args={[0.18, 3.8, 0.2]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>

      <mesh
        position={[1.4, 3, 0]}
        rotation={[0, 0, 0.45]}
      >
        <boxGeometry args={[0.18, 3.8, 0.2]} />
        <meshStandardMaterial color="#6b7280" />
      </mesh>

      {/* ================= TROLLEY ================= */}

      <mesh position={[0, 5.65, 0]} castShadow>
        <boxGeometry args={[1.5, 0.3, 0.65]} />
        <meshStandardMaterial
          color="#111827"
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>

      {/* ================= HOIST CABLE ================= */}

      <mesh position={[0, 5.1, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 1.1, 8]} />
        <meshStandardMaterial
          color="#111827"
          roughness={0.8}
          metalness={0.5}
        />
      </mesh>

      {/* ================= SPREADER ================= */}

      <mesh position={[0, 4.55, 0]} castShadow>
        <boxGeometry args={[1.8, 0.22, 0.65]} />
        <meshStandardMaterial
          color="#1f2937"
          roughness={0.55}
          metalness={0.8}
        />
      </mesh>

      {/* ================= WHEELS ================= */}

      {[-2.8, 2.8].map((x) => (
        <group key={x}>
          <mesh
            position={[x, 0.35, -0.28]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.38, 0.38, 0.25, 16]} />
            <meshStandardMaterial
              color="#111827"
              roughness={0.9}
              metalness={0.2}
            />
          </mesh>

          <mesh
            position={[x, 0.35, 0.28]}
            rotation={[Math.PI / 2, 0, 0]}
            castShadow
          >
            <cylinderGeometry args={[0.38, 0.38, 0.25, 16]} />
            <meshStandardMaterial
              color="#111827"
              roughness={0.9}
              metalness={0.2}
            />
          </mesh>
        </group>
      ))}

      {/* ================= STATUS LIGHT ================= */}

      <mesh position={[0, 6.35, 0]}>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={statusColor}
          emissive={statusColor}
          emissiveIntensity={1}
        />
      </mesh>
    </group>
  )
}