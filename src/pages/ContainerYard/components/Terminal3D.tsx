import { Text } from '@react-three/drei'
import * as THREE from 'three'
import type { JNPATerminal } from '@/data/jnpaLayout'

interface Terminal3DProps {
  terminal: JNPATerminal
}

const TERMINAL_COLORS = {
  container: '#64748b',
  coastal: '#78716c',
  shallow: '#a8a29e',
  liquid: '#57534e',
}

function YardLane({
  x,
  z,
  width,
  depth,
}: {
  x: number
  z: number
  width: number
  depth: number
}) {
  return (
    <mesh
      position={[x, 0.11, z]}
      receiveShadow
    >
      <boxGeometry args={[width, 0.025, depth]} />

      <meshStandardMaterial
        color="#334155"
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  )
}

export default function Terminal3D({ terminal }: Terminal3DProps) {
  const color = TERMINAL_COLORS[terminal.type]

  return (
    <group position={[terminal.x, 0, terminal.z]}>

      {/* Terminal yard surface */}
      {/* <mesh
        position={[
          terminal.width / 2,
          0,
          terminal.depth / 2,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            terminal.width,
            0.18,
            terminal.depth,
          ]}
        />

        <meshStandardMaterial
          color={color}
          roughness={0.9}
          metalness={0.05}
        />
      </mesh> */}

            {/* ================= YARD OPERATING LANES ================= */}

      {/* Main truck / RTG lane */}
      <YardLane
        x={terminal.width / 2}
        z={terminal.depth * 0.42}
        width={terminal.width - 4}
        depth={3}
      />

      {/* Second operating lane */}
      <YardLane
        x={terminal.width / 2}
        z={terminal.depth * 0.72}
        width={terminal.width - 4}
        depth={3}
      />

      {/* Quay / berth */}
      {/* <mesh
        position={[
          terminal.width / 2,
          0.12,
          -2.5,
        ]}
        receiveShadow
      >
        <boxGeometry
          args={[
            terminal.quayLength,
            0.25,
            5,
          ]}
        />

        <meshStandardMaterial
          color="#475569"
          roughness={0.85}
          metalness={0.2}
        />
      </mesh> */}

      {/* Terminal boundary */}
      <lineSegments>
        <edgesGeometry
          args={[
            new THREE.BoxGeometry(
              terminal.width,
              0.2,
              terminal.depth
            ),
          ]}
        />

        <lineBasicMaterial color="#1e293b" />
      </lineSegments>

      {/* Terminal name */}
      <Text
        position={[
          terminal.width / 2,
          0.35,
          terminal.depth / 2,
        ]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={2}
        color="#0f172a"
        anchorX="center"
        anchorY="middle"
      >
        {terminal.id}
      </Text>

    </group>
  )
}