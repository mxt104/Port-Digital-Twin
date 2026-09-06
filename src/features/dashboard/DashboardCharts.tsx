import type { YardStats } from '@/types/container'
import { CHART_COLORS } from '@/constants'
import { SAMPLE_CONTAINERS } from '@/data/containers'
import { TERMINALS } from '@/data/terminals'
import DonutChart from '@/components/charts/DonutChart'
import BarChart from '@/components/charts/BarChart'
import Panel from '@/components/ui/Panel'

interface DashboardChartsProps {
  stats: YardStats
}

function useChartData(stats: YardStats) {
  // Status distribution — key operational statuses grouped
  const s = stats.byStatus
  const statusData = [
    { name: 'Import',       value: s.import,        color: CHART_COLORS.blue   },
    { name: 'Export',       value: s.export,        color: CHART_COLORS.green  },
    { name: 'Transshipment',value: s.transshipment, color: CHART_COLORS.purple },
    { name: 'Empty',        value: s.empty,         color: CHART_COLORS.slate  },
    { name: 'Customs Hold', value: s['customs-hold'],color: CHART_COLORS.red   },
    { name: 'Loaded',       value: s.loaded,        color: CHART_COLORS.indigo },
    { name: 'Inspection',   value: s.inspection,    color: CHART_COLORS.orange },
    { name: 'Gate In',      value: s['gate-in'],    color: CHART_COLORS.cyan   },
    { name: 'Gate Out',     value: s['gate-out'],   color: CHART_COLORS.teal   },
  ].filter(d => d.value > 0)

  // Type distribution
  const typeCounts = SAMPLE_CONTAINERS.reduce<Record<string, number>>((acc, c) => {
    acc[c.type] = (acc[c.type] ?? 0) + 1
    return acc
  }, {})
  const typeData = [
    { name: '20 ft',    value: typeCounts['20ft']    ?? 0, color: CHART_COLORS.cyan   },
    { name: '40 ft',    value: typeCounts['40ft']    ?? 0, color: CHART_COLORS.blue   },
    { name: '40 ft HC', value: typeCounts['40ft-HC'] ?? 0, color: CHART_COLORS.purple },
    { name: '45 ft HC', value: typeCounts['45ft-HC'] ?? 0, color: CHART_COLORS.amber  },
  ].filter(d => d.value > 0)

  // Terminal distribution
  const terminalData = TERMINALS.map((t, i) => ({
    name:  t.code,
    value: SAMPLE_CONTAINERS.filter(c => c.terminal === t.code).length,
    color: [CHART_COLORS.blue, CHART_COLORS.cyan, CHART_COLORS.green, CHART_COLORS.purple, CHART_COLORS.orange, CHART_COLORS.teal][i % 6],
  }))

  return { statusData, typeData, terminalData }
}

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const { statusData, typeData, terminalData } = useChartData(stats)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      <Panel title="Container Status" subtitle="Operational status breakdown">
        <DonutChart
          data={statusData}
          height={240}
          centerLabel="Total"
          centerValue={stats.totalContainers}
        />
      </Panel>

      <Panel title="Container Types" subtitle="Fleet composition">
        <DonutChart data={typeData} height={240} />
      </Panel>

      <Panel title="Terminal Distribution" subtitle="Simulated yard inventory per terminal">
        <BarChart
          data={terminalData}
          height={240}
          horizontal={true}
          unit=" containers"
        />
      </Panel>
    </div>
  )
}
