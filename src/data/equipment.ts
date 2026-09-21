export type EquipmentStatus = 'active' | 'idle' | 'maintenance'

export interface RTGEquipment {
  id: string
  block: string
  x: number
  z: number
  status: EquipmentStatus
  utilization: number
  liftsPerHour: number
}

export const RTG_EQUIPMENT: RTGEquipment[] = [
  {
    id: 'RTG-01',
    block: 'A01',
    x: 0,
    z: 0,
    status: 'active',
    utilization: 84,
    liftsPerHour: 27,
  },
  {
    id: 'RTG-02',
    block: 'A02',
    x: 0,
    z: 0,
    status: 'active',
    utilization: 76,
    liftsPerHour: 24,
  },
  {
    id: 'RTG-03',
    block: 'B01',
    x: 0,
    z: 0,
    status: 'idle',
    utilization: 52,
    liftsPerHour: 18,
  },
  {
    id: 'RTG-04',
    block: 'B02',
    x: 0,
    z: 0,
    status: 'maintenance',
    utilization: 0,
    liftsPerHour: 0,
  },
]