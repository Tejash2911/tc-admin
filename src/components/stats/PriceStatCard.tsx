import React from 'react'

interface PriceStatCardProps {
  title: string
  value: number
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>
  bgColor: string
}

export const PriceStatCard = ({ title, value, icon, bgColor }: PriceStatCardProps) => {
  return (
    <div
      className={`h-[150px] flex-1 rounded-lg p-8 text-white ${bgColor} flex flex-col items-center justify-center gap-2`}
    >
      {icon}
      <p>{title}</p>
      <p className='text-xl font-medium'>{value}</p>
    </div>
  )
}
