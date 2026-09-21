import { Text } from '@react-three/drei'

interface YardBlock3DProps {
  block: string
  width: number
  depth: number
  x: number
  z: number
}

export default function YardBlock3D({
  block,
  width,
  depth,
  x,
  z,
}: YardBlock3DProps) {
  return (
    <group position={[x, 0, z]}>

      {/* ================= CONTAINER YARD ================= */}

      <mesh
        position={[0, 0, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[width, 0.12, depth]}
        />

        <meshStandardMaterial
          color="#475569"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* ================= RTG OPERATING LANE ================= */}

      <mesh
        position={[0, 0.08, 0]}
        receiveShadow
      >
        <boxGeometry
          args={[width, 0.025, 2.8]}
        />

        <meshStandardMaterial
          color="#1e293b"
          roughness={0.95}
        />
      </mesh>

      {/* ================= TRUCK ROAD ================= */}

      <mesh
        position={[0, 0.09, depth / 2 + 2]}
        receiveShadow
      >
        <boxGeometry
          args={[width + 4, 0.03, 3.5]}
        />

        <meshStandardMaterial
          color="#334155"
          roughness={0.95}
        />
      </mesh>

      {/* RTG operating lane */}
      <mesh
        position={[0, 0.11, depth / 2 + 2]}
        receiveShadow
      >
        <boxGeometry args={[width + 4, 0.04, 3]} />
        <meshStandardMaterial
          color="#1f2937"
          roughness={0.95}
        />
      </mesh>

      {/* ================= BLOCK LABEL ================= */}

      <Text
        position={[0, 0.18, -depth / 2 + 1]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.8}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        {block}
      </Text>

    </group>
  )
}