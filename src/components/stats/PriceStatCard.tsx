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
      className={`flex-1 h-[150px] p-8 rounded-lg text-white ${bgColor} flex flex-col justify-center items-center gap-2`}
    >
      {icon}
      <p>{title}</p>
      <p className='text-xl font-medium'>{value}</p>
    </div>
  )
}
