import { FC } from 'react'

interface ContentLayoutProps {
  children: React.ReactNode
  title?: string
  className?: string
}

const ContentLayout: FC<ContentLayoutProps> = ({ children, title = 'Content', className = '' }) => {
  return (
    <div className={`min-h-[calc(100vh-50px)] w-full flex flex-col items-center box-border ${className}`}>
      <div className='w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h1 className='text-xl font-bold mb-4 text-center mt-4'>{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default ContentLayout
