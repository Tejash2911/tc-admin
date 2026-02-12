import React from 'react'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip
} from 'chart.js'
import { Bar, Bubble, Doughnut, Line, Pie, PolarArea, Radar, Scatter } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, ArcElement, Tooltip, Legend, Title)

type ChartType = 'bar' | 'line' | 'pie' | 'doughnut' | 'radar' | 'polarArea' | 'bubble' | 'scatter'

interface ReusableChartProps {
  type: ChartType
  data: any
  options?: any
  height?: number
  width?: number
}

const chartMap: Record<ChartType, React.ElementType> = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  radar: Radar,
  polarArea: PolarArea,
  bubble: Bubble,
  scatter: Scatter
}

const ReusableChart: React.FC<ReusableChartProps> = ({ type, data, options = {}, height, width }) => {
  const ChartComponent = chartMap[type]

  return (
    <div
      style={{
        width: width || '100%',
        height: height || 'auto',
        position: 'relative'
      }}
    >
      <ChartComponent data={data} options={options} />
    </div>
  )
}

export default ReusableChart
