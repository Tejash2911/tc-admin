import type { FC } from 'react'

interface ContentLayoutProps {
  children: React.ReactNode
  title?: string
}

const ContentLayout: FC<ContentLayoutProps> = ({ children, title = 'Content' }) => {
  return (
    <div className={`box-border flex min-h-[calc(100vh-50px)] w-full flex-col items-center`}>
      <div className='w-full max-w-7xl px-4 sm:px-6 lg:px-8'>
        <h1 className='mt-4 mb-4 text-center text-xl font-bold'>{title}</h1>
        {children}
      </div>
    </div>
  )
}

export default ContentLayout
