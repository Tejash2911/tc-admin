import ChartsComponent from '@/components/charts'
import Stats from '@/components/stats'

function DashboardView() {
  return (
    <div className='w-full flex justify-center py-5 bg-gray-50'>
      <div className='w-[1200px] max-w-[90%] min-h-screen'>
        <h1 className='text-2xl font-semibold mb-4'>Dashboard Overview</h1>
        <Stats />
        <ChartsComponent />
      </div>
    </div>
  )
}

export default DashboardView
