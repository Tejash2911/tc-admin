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
      <td key={col.key} className='p-3'>
        <p
          className={`rounded-full border p-1 text-center text-xs font-medium ${
            value ? 'border-lime-600 bg-lime-100 text-lime-600' : 'border-red-500 bg-red-100 text-red-500'
          }`}
        >
          {value ? 'Activated' : 'Deactivated'}
        </p>
      </td>
    )
  }

  if (col.type === 'date') {
    return (
      <td key={col.key} className='p-3'>
        {new Date(value).toLocaleDateString()}
      </td>
    )
  }

  if (col.type === 'action') {
    return (
      <td key={col.key} className='flex items-center gap-1 p-3'>
        {onView && (
          <TooltipControl content='View'>
            <div className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-gray-100'>
              <Icon
                icon='ri:eye-line'
                className='h-4 w-4 text-gray-600 hover:text-gray-800'
                onClick={() => onView(item)}
              />
            </div>
          </TooltipControl>
        )}
        {onEdit && (
          <TooltipControl content='Edit'>
            <div className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-blue-100'>
              <Icon
                icon='ri:file-edit-line'
                className='h-4 w-4 text-blue-500 hover:text-blue-600'
                onClick={() => onEdit(item)}
              />
            </div>
          </TooltipControl>
        )}
        {onDelete && (
          <TooltipControl content='Delete'>
            <div className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-red-100'>
              <Icon
                icon='ri:delete-bin-7-line'
                className='h-4 w-4 text-red-500 hover:text-red-600'
                onClick={() => onDelete(item)}
              />
            </div>
          </TooltipControl>
        )}
      </td>
    )
  }

  if (col.type === 'text') {
    return (
      <td key={col.key} className='p-3'>
        {typeof value === 'string' && value.length > 75 ? `${value.slice(0, 75)}...` : value}
      </td>
    )
  }

  if (col.type === 'image') {
    return (
      <td key={col.key} className='p-3'>
        <Image src={value} height={100} width={100} className={`h-6 w-6 rounded-full object-center`} alt='avatar' />
      </td>
    )
  }

  if (col.type === 'boolean') {
    return (
      <td key={col.key} className='p-3'>
        <span className={`font-medium ${value ? 'text-green-600' : 'text-red-600'}`}>{value ? 'Yes' : 'No'}</span>
      </td>
    )
  }

  if (col.type === 'select') {
    const selectOptions = col.options || []
    return (
      <td key={col.key}>
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
      <td key={col.key} className='p-3'>
        <TooltipControl content='Copy'>
          <div className='flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-gray-100'>
            <Icon
              icon='ri:file-copy-line'
              className='h-4 w-4 cursor-pointer text-gray-600 hover:text-gray-800'
              onClick={() => navigator.clipboard.writeText(value)}
            />
          </div>
        </TooltipControl>
      </td>
    )
  }

  return (
    <td key={col.key} className='p-3'>
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
    <div className='mt-5 overflow-auto rounded-lg border border-gray-300'>
      <table className='w-full border-collapse'>
        <thead className='bg-teal-700 text-left text-white'>
          <tr>
            {columns.map((col, index) => (
              <td key={index} className={`p-3 ${col.width || ''}`}>
                {col.label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white'>
          {loading ? (
            Array.from({ length: skeletonRows }).map((_, index) => (
              <tr key={index} className='border-b border-gray-300'>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className='p-4'>
                    <div className='h-4 w-full animate-pulse rounded-xl bg-gray-200'></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className='p-4 text-center text-gray-500'>
                No records found
              </td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr
                key={item._id || index}
                className={`hover:bg-gray-50 ${index === data.length - 1 ? '' : 'border-b border-gray-300'}`}
              >
                {columns.map(col => getCell(item, col, onEdit, onDelete, onView, onChange))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
