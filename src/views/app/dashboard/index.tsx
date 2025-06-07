'use client'

import ChartsComponent from '@/components/charts'
import ContentLayout from '@/components/content-layout'
import Stats from '@/components/stats'

const DashboardView = () => {
  return (
    <ContentLayout title='Dashboard Overview'>
      <Stats />
      <ChartsComponent />
    </ContentLayout>
  )
}

export default DashboardView
