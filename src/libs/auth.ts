const getAuthFromStorage = () => {
  if (typeof window === 'undefined') return null

  try {
    const auth = localStorage.getItem('auth')
    return auth ? JSON.parse(auth) : null
  } catch (error) {
    console.error('Error parsing auth from localStorage:', error)
    return null
  }
}

export const getAccessToken = () => {
  const auth = getAuthFromStorage()
  return auth?.accessToken || null
}

export const getCurrentUser = () => {
  const auth = getAuthFromStorage()
  return auth || null
}
