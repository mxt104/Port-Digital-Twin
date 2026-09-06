import type { EChartsOption } from 'echarts'
import { CHART_COLORS, CHART_TEXT_COLOR, CHART_TOOLTIP_STYLE } from '@/constants'
import BaseChart from './BaseChart'

interface DonutSegment {
  name: string
  value: number
  color?: string
}

interface DonutChartProps {
  data: DonutSegment[]
  height?: number
  centerLabel?: string
  centerValue?: string | number
  className?: string
  loading?: boolean
}

const DEFAULT_COLORS = [
  CHART_COLORS.blue,  CHART_COLORS.green,  CHART_COLORS.amber,
  CHART_COLORS.red,   CHART_COLORS.purple, CHART_COLORS.cyan,
  CHART_COLORS.indigo, CHART_COLORS.teal,  CHART_COLORS.orange,
  CHART_COLORS.slate,
]

export default function DonutChart({
  data, height = 280, centerLabel, centerValue, className, loading,
}: DonutChartProps) {
  const option: EChartsOption = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger:   'item',
      formatter: '{b}: {c} ({d}%)',
      ...CHART_TOOLTIP_STYLE,
    },
    legend: {
      orient:    'vertical',
      right:     '4%',
      top:       'center',
      icon:      'circle',
      itemWidth:  8,
      itemHeight: 8,
      itemGap:   10,
      textStyle: { color: CHART_TEXT_COLOR, fontSize: 12 },
      formatter: (name: string) => {
        const item = data.find(d => d.name === name)
        return item ? `${name}  ${item.value}` : name
      },
    },
    series: [
      {
        type:   'pie',
        radius: ['52%', '78%'],
        center: ['38%', '50%'],
        avoidLabelOverlap: false,
        padAngle: 2,
        itemStyle: {
          borderRadius: 4,
          borderColor:  '#ffffff',
          borderWidth:  2,
        },
        label: {
          show:      !!centerLabel,
          position:  'center',
          formatter: () => `{title|${centerLabel ?? ''}}\n{value|${centerValue ?? ''}}`,
          rich: {
            title: { color: CHART_TEXT_COLOR,   fontSize: 11, lineHeight: 20 },
            value: { color: '#0f172a',           fontSize: 22, fontWeight: 700, lineHeight: 28 },
          },
        },
        emphasis: {
          label:     { show: !!centerLabel },
          scale:     true,
          scaleSize: 4,
        },
        data: data.map((item, i) => ({
          name:      item.name,
          value:     item.value,
          itemStyle: { color: item.color ?? DEFAULT_COLORS[i % DEFAULT_COLORS.length] },
        })),
      },
    ],
  }

  return <BaseChart option={option} height={height} className={className} loading={loading} />
}
