import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'

interface BaseChartProps {
  option: EChartsOption
  height?: number | string
  className?: string
  loading?: boolean
}

export default function BaseChart({ option, height = 280, className = '', loading = false }: BaseChartProps) {
  return (
    <div className={className}>
      <ReactECharts
        option={option}
        style={{ height: typeof height === 'number' ? `${height}px` : height, width: '100%' }}
        showLoading={loading}
        loadingOption={{
          text:      '',
          color:     '#1d4ed8',
          textColor: '#64748b',
          maskColor: 'rgba(255,255,255,0.7)',
        }}
        opts={{ renderer: 'canvas' }}
      />
    </div>
  )
}
