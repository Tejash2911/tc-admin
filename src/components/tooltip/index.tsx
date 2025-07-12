import type { ReactNode } from 'react'
import { useState } from 'react'

interface IProps {
  content: string | ReactNode
  placement?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: ReactNode
}

export default function Tooltip({ content, placement = 'top', delay = 200, children }: IProps) {
  const [visible, setVisible] = useState<boolean>(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)

  const showTooltip = () => {
    const id = setTimeout(() => setVisible(true), delay)
    setTimeoutId(id)
  }

  const hideTooltip = () => {
    if (timeoutId) clearTimeout(timeoutId)
    setVisible(false)
  }

  return (
    <div className='relative inline-block' onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}

      {visible && (
        <div
          className={`absolute z-50 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white shadow-md ${placement === 'top' && 'bottom-full left-1/2 mb-2 -translate-x-1/2'} ${placement === 'bottom' && 'top-full left-1/2 mt-2 -translate-x-1/2'} ${placement === 'left' && 'top-1/2 right-full mr-2 -translate-y-1/2'} ${placement === 'right' && 'top-1/2 left-full ml-2 -translate-y-1/2'} `}
        >
          {content}
        </div>
      )}
    </div>
  )
}
