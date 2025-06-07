import { useEffect, useState } from 'react'
import { Pie } from 'react-chartjs-2'

interface IProps {
  data: { title: string; purchasedCount: number }[]
  title: string
}

const PieChart = ({ data, title }: IProps) => {
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: []
  })

  useEffect(() => {
    if (!data || data.length === 0) return

    setChartData({
      labels: data.map(d => d.title),
      datasets: [
        {
          label: 'Purchase Count',
          data: data.map(d => d.purchasedCount),
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 141, 153, 0.6)',
            'rgba(77, 109, 243, 0.6)',
            'rgba(238, 130, 238, 0.6)',
            'rgba(64, 224, 208, 0.6)'
          ],
          hoverBorderWidth: 1,
          hoverBorderColor: '#000'
        }
      ]
    })
  }, [data])

  const options = {
    maintainAspectRatio: false
  }

  return (
    <div className='border border-gray-300 bg-white rounded-lg p-4'>
      <h2 className='text-base font-medium mb-2'>{title}</h2>
      <div className='h-64'>
        <Pie data={chartData} options={options} />
      </div>
    </div>
  )
}

export default PieChart
