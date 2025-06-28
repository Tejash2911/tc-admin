import React from 'react'

interface IProps {
  title: string
  value: number | string
  icon: React.ReactElement<React.SVGProps<SVGSVGElement>>
  iconBgColor: string
  iconColor: string
}

export const StatCard = ({ title, value, icon, iconBgColor, iconColor }: IProps) => {
  return (
    <div className='flex h-[100px] min-w-[250px] flex-1 rounded-lg border border-gray-300 bg-white p-4'>
      <div className='flex w-1/3 items-center justify-center'>
        <div className={`flex h-[50px] w-[50px] items-center justify-center rounded-full ${iconBgColor}`}>
          {React.cloneElement(icon, { className: `text-${iconColor}` })}
        </div>
      </div>
      <div className='flex w-2/3 flex-col justify-center'>
        <p>{title}</p>
        <p className='text-xl'>{value}</p>
      </div>
    </div>
  )
}
