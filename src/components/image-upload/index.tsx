'use client'

import { useEffect, useRef, useState } from 'react'

interface Props {
  value: string
  onChange: (base64Image: string) => void
}

const ImageUpload = ({ value, onChange }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string>(value)

  useEffect(() => {
    if (value) {
      setPreview(value)
    }
  }, [value])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreview(base64String)
        onChange(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const base64String = reader.result as string
        setPreview(base64String)
        onChange(base64String)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const handleRemoveImage = () => {
    setPreview('')
    onChange('')
  }

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className='relative w-full flex flex-col items-center justify-center p-9 border-2 border-dashed rounded-xl cursor-pointer'
      onClick={() => fileInputRef.current?.click()}
    >
      {preview ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt='preview' className='h-full object-contain p-2' />
          <button
            type='button'
            onClick={e => {
              e.stopPropagation()
              handleRemoveImage()
            }}
            className='absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600'
          >
            ✕
          </button>
        </>
      ) : (
        <p className='text-gray-400'>Drag & drop an image here, or click to select</p>
      )}
      <input type='file' accept='image/*' onChange={handleFileChange} ref={fileInputRef} className='hidden' />
    </div>
  )
}

export default ImageUpload
