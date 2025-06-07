import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: string
  label?: string
  name?: string
  helperText?: string
  readOnly?: boolean
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  name?: string
  helperText?: string
  readOnly?: boolean
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  name?: string
  label?: string
  error?: string
}

export const Input: React.FC<InputProps> = ({ label, helperText, type = 'text', name, readOnly = false, ...props }) => {
  const baseClasses = `w-full p-2 bg-gray-100 rounded-lg border border-[#ccc] h-10`
  const focusClasses = 'focus:outline-none focus:ring-1 focus:ring-teal-700'
  const readOnlyClasses = readOnly ? 'bg-gray-300 cursor-not-allowed' : ''

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='block font-semibold'>
          {label}
        </label>
      )}
      <input
        {...props}
        type={type}
        id={name}
        name={name}
        readOnly={readOnly}
        className={`${baseClasses} ${focusClasses} ${readOnlyClasses}`}
      />
      {helperText && <p className='text-sm text-gray-500'>{helperText}</p>}
    </div>
  )
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  helperText,
  name,
  readOnly = false,
  rows = 4,
  ...props
}) => {
  const baseClasses = `w-full p-2 bg-gray-100 rounded-lg border border-[#ccc]`
  const focusClasses = 'focus:outline-none focus:ring-1 focus:ring-teal-700'
  const readOnlyClasses = readOnly ? 'bg-gray-300 cursor-not-allowed' : ''

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='block font-semibold'>
          {label}
        </label>
      )}
      <textarea
        {...props}
        id={name}
        name={name}
        readOnly={readOnly}
        rows={rows}
        className={`${baseClasses} ${focusClasses} ${readOnlyClasses}`}
      />
      {helperText && <p className='text-sm text-gray-500'>{helperText}</p>}
    </div>
  )
}

interface Option {
  label: string
  value: string
}

export const Select: React.FC<SelectProps & { options?: Option[] }> = ({
  label,
  error,
  children,
  name,
  options = [],
  ...props
}) => {
  const baseClasses = 'w-full p-2 bg-gray-100 rounded-lg border border-[#ccc] h-10'
  const focusClasses = 'focus:outline-none focus:ring-1 focus:ring-teal-700'

  return (
    <div className='flex flex-col gap-1'>
      {label && (
        <label htmlFor={name} className='block font-semibold'>
          {label}
        </label>
      )}
      <select {...props} id={name} name={name} className={`${baseClasses} ${focusClasses}`}>
        {children}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  )
}
