import { TERMINALS } from '@/data/terminals'
import { SAMPLE_CONTAINERS } from '@/data/containers'
import type { Terminal, TerminalStats } from '@/types/terminal'

export async function getTerminals(): Promise<Terminal[]> {
  return Promise.resolve([...TERMINALS])
}

export async function getTerminalByCode(code: string): Promise<Terminal | undefined> {
  return Promise.resolve(TERMINALS.find(t => t.code === code))
}

export async function getTerminalStats(): Promise<TerminalStats[]> {
  return Promise.resolve(
    TERMINALS.map(t => {
      const containers        = SAMPLE_CONTAINERS.filter(c => c.terminal === t.code)
      const importCount       = containers.filter(c => c.status === 'import').length
      const exportCount       = containers.filter(c => c.status === 'export').length
      const transshipmentCount= containers.filter(c => c.status === 'transshipment').length
      return {
        code:                t.code,
        containerCount:      containers.length,
        utilizationPercent:  Math.round((containers.length / t.yardCapacity) * 100 * 10) / 10,
        importCount,
        exportCount,
        transshipmentCount,
      }
    })
  )
}
