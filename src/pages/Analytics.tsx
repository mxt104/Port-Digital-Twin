import { useContainers } from '@/hooks/useContainers'
import { CHART_COLORS, CHART_TEXT_COLOR, CHART_GRID_COLOR, CHART_TOOLTIP_STYLE } from '@/constants'
import { SAMPLE_CONTAINERS } from '@/data/containers'
import { TERMINALS } from '@/data/terminals'
import { THROUGHPUT_TREND, PORT_METRICS } from '@/data/portMetrics'
import { ENV_TREND } from '@/data/environment'
import Panel from '@/components/ui/Panel'
import DonutChart from '@/components/charts/DonutChart'
import BarChart from '@/components/charts/BarChart'
import BaseChart from '@/components/charts/BaseChart'
import type { EChartsOption } from 'echarts'

// ── Shipping line distribution ────────────────────────────────────────────────
function ShippingLineChart() {
  const counts = SAMPLE_CONTAINERS.reduce<Record<string, number>>((acc, c) => {
    acc[c.shippingLine] = (acc[c.shippingLine] ?? 0) + 1
    return acc
  }, {})

  const data = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }))

  return <BarChart data={data} height={240} horizontal unit=" containers" />
}

// ── Terminal utilization chart ─────────────────────────────────────────────────
function TerminalUtilizationChart() {
  const data = TERMINALS.map((t, i) => {
    const count = SAMPLE_CONTAINERS.filter(c => c.terminal === t.code).length
    const util = Math.round((count / t.yardCapacity) * 100 * 10) / 10
    return {
      name: t.code,
      value: util,
      color: [CHART_COLORS.blue, CHART_COLORS.cyan, CHART_COLORS.green,
      CHART_COLORS.purple, CHART_COLORS.orange, CHART_COLORS.teal][i % 6],
    }
  })

  return <BarChart data={data} height={240} horizontal unit="%" />
}

// ── Throughput trend ─────────────────────────────────────────────────────────
function ThroughputTrendChart() {
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...CHART_TOOLTIP_STYLE },
    grid: { top: 16, bottom: 24, left: 8, right: 16, containLabel: true },
    xAxis: {
      type: 'category',
      data: THROUGHPUT_TREND.map(d => d.month),
      axisLabel: { color: CHART_TEXT_COLOR, fontSize: 10, interval: 2 },
      axisLine: { lineStyle: { color: CHART_GRID_COLOR } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: CHART_TEXT_COLOR, fontSize: 10,
        formatter: (v: number) => `${(v / 1000).toFixed(0)}K`,
      },
      splitLine: { lineStyle: { color: CHART_GRID_COLOR } },
      axisLine: { show: false },
    },
    series: [{
      type: 'bar',
      data: THROUGHPUT_TREND.map(d => d.teus),
      itemStyle: {
        color: {
          type: 'linear', x: 0, y: 0, x2: 0, y2: 1,
          colorStops: [
            { offset: 0, color: CHART_COLORS.blue },
            { offset: 1, color: '#93c5fd' },
          ],
        },
        borderRadius: [3, 3, 0, 0],
      },
      barMaxWidth: 28,
    }],
  }
  return <BaseChart option={option} height={240} />
}

// ── AQI 7-day trend ───────────────────────────────────────────────────────────
function AqiTrendChart() {
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: { trigger: 'axis', ...CHART_TOOLTIP_STYLE },
    legend: {
      bottom: 0,
      icon: 'circle',
      itemWidth: 8, itemHeight: 8,
      textStyle: { color: CHART_TEXT_COLOR, fontSize: 11 },
      data: ['AQI', 'PM2.5', 'PM10'],
    },
    grid: { top: 16, bottom: 40, left: 8, right: 16, containLabel: true },
    xAxis: {
      type: 'category',
      data: ENV_TREND.map(d => d.date.slice(5)),
      axisLabel: { color: CHART_TEXT_COLOR, fontSize: 10 },
      axisLine: { lineStyle: { color: CHART_GRID_COLOR } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: CHART_TEXT_COLOR, fontSize: 10 },
      splitLine: { lineStyle: { color: CHART_GRID_COLOR } },
      axisLine: { show: false },
    },
    series: [
      {
        name: 'AQI',
        type: 'line',
        data: ENV_TREND.map(d => d.aqi),
        smooth: true,
        lineStyle: { color: CHART_COLORS.red, width: 2 },
        itemStyle: { color: CHART_COLORS.red },
        symbol: 'circle', symbolSize: 5,
      },
      {
        name: 'PM2.5',
        type: 'line',
        data: ENV_TREND.map(d => d.pm25),
        smooth: true,
        lineStyle: { color: CHART_COLORS.orange, width: 2 },
        itemStyle: { color: CHART_COLORS.orange },
        symbol: 'circle', symbolSize: 5,
      },
      {
        name: 'PM10',
        type: 'line',
        data: ENV_TREND.map(d => d.pm10),
        smooth: true,
        lineStyle: { color: CHART_COLORS.amber, width: 2, type: 'dashed' },
        itemStyle: { color: CHART_COLORS.amber },
        symbol: 'circle', symbolSize: 5,
      },
    ],
  }
  return <BaseChart option={option} height={260} />
}

// ── Cargo type distribution ────────────────────────────────────────────────────
function CargoTypeChart() {
  const CARGO_LABELS: Record<string, string> = {
    general: 'General', refrigerated: 'Refrigerated',
    bulk: 'Dry Bulk', hazardous: 'Hazardous',
    liquid: 'Liquid', 'ro-ro': 'RoRo',
  }
  const counts = SAMPLE_CONTAINERS.reduce<Record<string, number>>((acc, c) => {
    acc[c.cargoType] = (acc[c.cargoType] ?? 0) + 1
    return acc
  }, {})
  const data = Object.entries(counts).map(([k, v], i) => ({
    name: CARGO_LABELS[k] ?? k,
    value: v,
    color: [CHART_COLORS.blue, CHART_COLORS.cyan, CHART_COLORS.amber,
    CHART_COLORS.red, CHART_COLORS.green, CHART_COLORS.purple][i % 6],
  }))
  return <DonutChart data={data} height={240} />
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AnalyticsPage() {
  const { stats, loading } = useContainers()

  const statusData = stats
    ? [
      { name: 'Import', value: stats.byStatus.import, color: CHART_COLORS.blue },
      { name: 'Export', value: stats.byStatus.export, color: CHART_COLORS.green },
      { name: 'Transshipment', value: stats.byStatus.transshipment, color: CHART_COLORS.purple },
      { name: 'Empty', value: stats.byStatus.empty, color: CHART_COLORS.slate },
      { name: 'Loaded', value: stats.byStatus.loaded, color: CHART_COLORS.indigo },
      { name: 'Customs Hold', value: stats.byStatus['customs-hold'], color: CHART_COLORS.red },
      { name: 'Inspection', value: stats.byStatus.inspection, color: CHART_COLORS.orange },
      { name: 'Gate In', value: stats.byStatus['gate-in'], color: CHART_COLORS.cyan },
      { name: 'Gate Out', value: stats.byStatus['gate-out'], color: CHART_COLORS.teal },
    ].filter(d => d.value > 0)
    : []

  const tradeData = [
    { name: 'Import', value: PORT_METRICS.importPercent, color: CHART_COLORS.blue },
    { name: 'Export', value: PORT_METRICS.exportPercent, color: CHART_COLORS.green },
    { name: 'Transshipment', value: PORT_METRICS.transshipmentPercent, color: CHART_COLORS.purple },
    { name: 'Other', value: 100 - PORT_METRICS.importPercent - PORT_METRICS.exportPercent - PORT_METRICS.transshipmentPercent, color: CHART_COLORS.slate },
  ]

  return (
    <div className="p-5 space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Fleet Analytics
        </h2>
        <span className="text-2xs text-text-disabled">
          Simulated data · JNPA reference context · {stats?.totalContainers ?? '—'} containers
        </span>
      </div>

      {/* Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Panel title="Status Distribution" subtitle="Operational status breakdown">
          {loading
            ? <div className="h-60 flex items-center justify-center text-text-muted text-xs animate-pulse">Loading…</div>
            : <DonutChart
              data={statusData}
              height={240}
              centerLabel="Total"
              centerValue={stats?.totalContainers ?? '—'}
            />
          }
        </Panel>

        <Panel title="Trade Mode" subtitle="Import · Export · Transshipment split">
          <DonutChart
            data={tradeData}
            height={240}
            centerLabel="Trade Mix"
          />
        </Panel>

        <Panel title="Cargo Types" subtitle="Fleet by cargo category">
          <CargoTypeChart />
        </Panel>
      </div>

      {/* Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel title="Shipping Line Distribution" subtitle="Top carriers in simulated inventory">
          <ShippingLineChart />
        </Panel>

        <Panel title="Terminal Utilization (%)" subtitle="Containers vs. yard capacity per terminal">
          <TerminalUtilizationChart />
        </Panel>
      </div>

      {/* Row 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Panel
          title="Monthly Throughput"
          subtitle="Simulated TEU movement — last 12 months"
        >
          <ThroughputTrendChart />
        </Panel>

        <Panel
          title="Air Quality Trend"
          subtitle="AQI · PM2.5 · PM10 — last 7 days (simulated)"
        >
          <AqiTrendChart />
        </Panel>
      </div>
    </div>
  )
}
