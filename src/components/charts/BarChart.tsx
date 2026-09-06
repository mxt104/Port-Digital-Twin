import type { EChartsOption } from 'echarts'
import { CHART_COLORS, CHART_TEXT_COLOR, CHART_GRID_COLOR, CHART_TOOLTIP_STYLE } from '@/constants'
import BaseChart from './BaseChart'

interface BarDataItem {
  name: string
  value: number
  color?: string
}

interface BarChartProps {
  data: BarDataItem[]
  xAxisLabel?: string
  yAxisLabel?: string
  height?: number
  horizontal?: boolean
  className?: string
  loading?: boolean
  unit?: string
}

export default function BarChart({
  data,
  height = 280,
  horizontal = true,
  className,
  loading,
  unit = '',
}: BarChartProps) {
  const names = data.map(d => d.name)
  const values = data.map(d => d.value)
  const colors = data.map((d, i) => d.color ?? [CHART_COLORS.blue, CHART_COLORS.green, CHART_COLORS.amber, CHART_COLORS.purple, CHART_COLORS.cyan][i % 5])

  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params: unknown) => {
        const p = params as Array<{ name: string; value: number }>
        if (!p || p.length === 0) return ''
        return `<span style="color:#64748b">${p[0].name}</span><br/><b style="color:#0f172a">${p[0].value}${unit}</b>`
      },
      ...CHART_TOOLTIP_STYLE,
    },
    grid: {
      top: 12,
      bottom: horizontal ? 12 : 28,
      left: horizontal ? 8 : 48,
      right: 16,
      containLabel: true,
    },
    xAxis: horizontal
      ? {
          type: 'value',
          axisLabel: { color: CHART_TEXT_COLOR, fontSize: 11 },
          splitLine: { lineStyle: { color: CHART_GRID_COLOR } },
          axisLine: { show: false },
        }
      : {
          type: 'category',
          data: names,
          axisLabel: { color: CHART_TEXT_COLOR, fontSize: 11 },
          axisLine: { lineStyle: { color: CHART_GRID_COLOR } },
          axisTick: { show: false },
        },
    yAxis: horizontal
      ? {
          type: 'category',
          data: names,
          axisLabel: { color: CHART_TEXT_COLOR, fontSize: 11 },
          axisLine: { show: false },
          axisTick: { show: false },
        }
      : {
          type: 'value',
          axisLabel: { color: CHART_TEXT_COLOR, fontSize: 11 },
          splitLine: { lineStyle: { color: CHART_GRID_COLOR } },
          axisLine: { show: false },
        },
    series: [
      {
        type: 'bar',
        data: values.map((v, i) => ({
          value: v,
          itemStyle: { color: colors[i], borderRadius: horizontal ? [0, 3, 3, 0] : [3, 3, 0, 0] },
        })),
        barMaxWidth: 28,
      },
    ],
  }

  return <BaseChart option={option} height={height} className={className} loading={loading} />
}
