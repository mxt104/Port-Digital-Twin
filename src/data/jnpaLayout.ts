export type TerminalType = 'container' | 'coastal' | 'shallow' | 'liquid'

export interface JNPATerminal {
  id: string
  name: string
  type: TerminalType

  // Approximate 3D position
  x: number
  z: number

  // Approximate visualization dimensions
  width: number
  depth: number

  // Approximate quay length for visualization
  quayLength: number

  // Number of yard zones we want to visualize
  yardRows: number
  yardColumns: number
}

export const JNPA_TERMINALS: JNPATerminal[] = [
  {
    id: 'NSFT',
    name: 'Nhava Sheva Free Port Terminal',
    type: 'container',
    x: 0,
    z: 0,
    width: 55,
    depth: 32,
    quayLength: 55,
    yardRows: 3,
    yardColumns: 4,
  },

  {
    id: 'NSICT',
    name: 'Nhava Sheva International Container Terminal',
    type: 'container',
    x: 62,
    z: 0,
    width: 45,
    depth: 28,
    quayLength: 45,
    yardRows: 3,
    yardColumns: 3,
  },

  {
    id: 'APMT',
    name: 'APM Terminals Mumbai',
    type: 'container',
    x: 112,
    z: 0,
    width: 55,
    depth: 32,
    quayLength: 55,
    yardRows: 3,
    yardColumns: 4,
  },

  {
    id: 'NSIGT',
    name: 'Nhava Sheva International Gateway Terminal',
    type: 'container',
    x: 172,
    z: 0,
    width: 48,
    depth: 30,
    quayLength: 48,
    yardRows: 3,
    yardColumns: 3,
  },

  {
    id: 'BMCT',
    name: 'Bharat Mumbai Container Terminal',
    type: 'container',
    x: 0,
    z: 48,
    width: 90,
    depth: 42,
    quayLength: 90,
    yardRows: 4,
    yardColumns: 5,
  },

  {
    id: 'NSDT',
    name: 'Nhava Sheva Distribution Terminal',
    type: 'shallow',
    x: 98,
    z: 48,
    width: 38,
    depth: 24,
    quayLength: 38,
    yardRows: 2,
    yardColumns: 3,
  },

  {
    id: 'COASTAL',
    name: 'Coastal Berth',
    type: 'coastal',
    x: 142,
    z: 48,
    width: 42,
    depth: 24,
    quayLength: 42,
    yardRows: 2,
    yardColumns: 3,
  },

  {
    id: 'LIQUID',
    name: 'Liquid Cargo Terminal',
    type: 'liquid',
    x: 190,
    z: 48,
    width: 42,
    depth: 30,
    quayLength: 42,
    yardRows: 2,
    yardColumns: 2,
  },
]