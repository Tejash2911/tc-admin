import { Fragment, type FC } from 'react'
import Link from 'next/link'

interface IBreadcrumbProps {
  items: Array<{ label: string; href?: string }>
  className?: string
}

const Breadcrumb: FC<IBreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav className={`flex items-center gap-4 ${className}`} aria-label='Breadcrumb'>
      <div className='flex items-center'>
        {items.map((item, index) => (
          <Fragment key={index}>
            {index > 0 && <span className='mx-2 text-gray-400'>/</span>}
            {item.href ? (
              <Link href={item.href} className='text-gray-500 hover:text-gray-700 hover:underline'>
                {item.label}
              </Link>
            ) : (
              <span className='font-medium text-gray-900'>{item.label}</span>
            )}
          </Fragment>
        ))}
      </div>
    </nav>
  )
}

export default Breadcrumb
