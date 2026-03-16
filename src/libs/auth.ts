export default function getAccessToken() {
  if (typeof window !== 'undefined') {
    try {
      const auth = JSON.parse(localStorage.getItem('auth') || '{}')

      return auth.accessToken || null
    } catch (error) {
      console.error('Error retrieving access token:', error)

      return null
    }
  }

  return null
}

export const getCurrentUser = () => {
  if (typeof window === 'undefined') return null

  const auth = localStorage.getItem('auth')

  return auth ? JSON.parse(auth) : null
}
