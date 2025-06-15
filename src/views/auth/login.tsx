'use client'

import { FormEvent, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks'
import { login } from '@/redux/slices/authSlice'

const LoginV2 = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { currentUser, loading } = useAppSelector(({ auth }) => auth)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/home')
  }, [currentUser])

  const handle = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      dispatch(login({ email, password }))
    }
  }

  return (
    <div className='flex min-h-screen items-center justify-center'>
      <div className='w-full max-w-sm rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-xl font-semibold text-gray-800'>Login</h1>
        <form className='space-y-4 text-xs' autoComplete='on' onSubmit={handle.onSubmit}>
          <div>
            <input
              className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
              name='emailField'
              type='email'
              placeholder='Email'
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className='focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900'
              name='passwordField'
              type='password'
              placeholder='Password'
              onChange={e => setPassword(e.target.value)}
              autoComplete='off'
            />
          </div>
          <div className='text-primary-600 text-right font-medium hover:underline'>
            <Link href='/forgot-password' className='text-gray-500 hover:underline'>
              Forgot your password?
            </Link>
          </div>
          <button
            type='submit'
            className='focus:shadow-outline rounded-lg bg-black px-4 py-2 text-white focus:outline-none disabled:bg-gray-500'
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        <div className='mt-4 text-center'>
          <p className='text-xs font-medium text-gray-500'>
            Don’t have an account yet?
            <Link href='/register' className='text-gray-500 hover:underline'>
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginV2
