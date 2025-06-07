import React from 'react'

interface StatCardProps {
  title: string
  value: number | string
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>
  iconBgColor: string
  iconColor: string
}

export const StatCard = ({ title, value, icon, iconBgColor, iconColor }: StatCardProps) => {
  return (
    <div className='flex-1 min-w-[250px] h-[100px] p-4 border border-gray-300 bg-white rounded-lg flex'>
      <div className='flex justify-center items-center w-1/3'>
        <div className={`w-[50px] h-[50px] flex justify-center items-center rounded-full ${iconBgColor}`}>
          {React.cloneElement(icon, { className: `text-${iconColor}` })}
        </div>
      </div>
      <div className='flex flex-col justify-center w-2/3'>
        <p>{title}</p>
        <p className='text-xl'>{value}</p>
      </div>
    </div>
  )
}
