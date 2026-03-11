import React from 'react'
import Image from 'next/image'
import { Icon } from '@iconify/react'
import type { ColumnI, TableProps } from '@/types/table-props'
import { Select } from '../input'
import TooltipControl from '../tooltip'

const getCell = (
  item: any,
  col: ColumnI,
  onEdit?: (item: any) => void,
  onDelete?: (item: any) => void,
  onView?: (item: any) => void,
  onChange?: (item: any, newValue: string) => void
): React.ReactElement => {
  const value = item[col.key]

  if (col.type === 'status') {
    return (
      <td key={col.key} className='px-4 py-3'>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            value ? 'border-green-600 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700'
          }`}
        >
          {value ? 'Activated' : 'Deactivated'}
        </span>
      </td>
    )
  }

  if (col.type === 'date') {
    return (
      <td key={col.key} className='px-4 py-3 text-sm text-gray-900'>
        {new Date(value).toLocaleDateString()}
      </td>
    )
  }

  if (col.type === 'action') {
    return (
      <td key={col.key} className='px-4 py-3'>
        <div className='flex items-center gap-2'>
          {onView && (
            <TooltipControl content='View'>
              <button className='flex h-5 w-5 items-center justify-center rounded-lg text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'>
                <Icon icon='ri:eye-line' className='h-4 w-4' onClick={() => onView(item)} />
              </button>
            </TooltipControl>
          )}
          {onEdit && (
            <TooltipControl content='Edit'>
              <button className='flex h-5 w-5 items-center justify-center rounded-lg text-blue-600 transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700'>
                <Icon icon='ri:edit-box-line' className='h-4 w-4' onClick={() => onEdit(item)} />
              </button>
            </TooltipControl>
          )}
          {onDelete && (
            <TooltipControl content='Delete'>
              <button className='flex h-5 w-5 items-center justify-center rounded-lg text-red-600 transition-colors duration-200 hover:bg-red-50 hover:text-red-700'>
                <Icon icon='ri:delete-bin-7-line' className='h-4 w-4' onClick={() => onDelete(item)} />
              </button>
            </TooltipControl>
          )}
        </div>
      </td>
    )
  }

  if (col.type === 'text') {
    return (
      <td key={col.key} className='px-4 py-3 text-sm text-gray-900'>
        {value}
      </td>
    )
  }

  if (col.type === 'image') {
    return (
      <td key={col.key} className='px-4 py-3'>
        <Image src={value} height={100} width={100} className='h-8 w-8 rounded-full object-cover' alt='avatar' />
      </td>
    )
  }

  if (col.type === 'boolean') {
    return (
      <td key={col.key} className='px-4 py-3 text-sm'>
        <span
          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}
        >
          {value ? 'Yes' : 'No'}
        </span>
      </td>
    )
  }

  if (col.type === 'select') {
    const selectOptions = col.options || []
    return (
      <td key={col.key} className='px-4 py-3'>
        <Select
          value={value}
          onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const newValue = e.target.value
            if (onChange) {
              onChange(item, newValue)
            }
          }}
          options={selectOptions}
        />
      </td>
    )
  }

  if (col.type === 'copy') {
    return (
      <td key={col.key} className='px-4 py-3'>
        <TooltipControl content='Copy'>
          <button className='flex h-5 w-5 items-center justify-center rounded-lg text-gray-600 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-900'>
            <Icon icon='ri:file-copy-line' className='h-4 w-4' onClick={() => navigator.clipboard.writeText(value)} />
          </button>
        </TooltipControl>
      </td>
    )
  }

  return (
    <td key={col.key} className='px-4 py-3 text-sm text-gray-900'>
      {value}
    </td>
  )
}

export const Table = ({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  loading = false,
  onChange,
  skeletonRows = 10
}: TableProps) => {
  return (
    <div className='mt-5 overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm'>
      <table className='w-full border-collapse'>
        <thead className='border-b border-gray-200 bg-gray-50'>
          <tr>
            {columns.map((col, index) => (
              <th key={index} className={`px-4 py-3 text-left text-sm font-semibold text-gray-900 ${col.width || ''}`}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='divide-y divide-gray-200'>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, index) => (
              <tr key={index} className='animate-pulse'>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className='px-4 py-3'>
                    <div className='h-8 w-full rounded bg-gray-200'></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='px-4 py-8 text-center text-sm text-gray-500'>
                No records found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item._id || index} className='transition-colors duration-150 hover:bg-gray-50'>
                {columns.map(col => getCell(item, col, onEdit, onDelete, onView, onChange))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
