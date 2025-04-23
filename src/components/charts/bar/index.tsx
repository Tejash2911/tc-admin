import { useEffect, useState } from 'react'
import { Bar } from 'react-chartjs-2'

interface Iprops {
  data: { _id: string; count: number }[]
  color: boolean
  title: string
}

const BarChart = ({ data, color, title }: Iprops) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if (!data || data.length === 0) return

    setChartData({
      labels: data.map(d => d._id),
      datasets: [
        {
          label: 'Purchase Count',
          data: data.map(d => d.count),
          backgroundColor: color
            ? data.map(d => d._id)
            : [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
              ],
          hoverBorderWidth: 1,
          hoverBorderColor: '#000'
        }
      ]
    })
  }, [data, color])

  const options = {
    maintainAspectRatio: false
  }

  return (
    <div className='box-border flex-1 bg-white border border-gray-200 rounded-[10px] p-4'>
      <h2 className='text-base font-medium mb-2'>{title}</h2>
      <div className='h-64'>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  )
}

export default BarChart
