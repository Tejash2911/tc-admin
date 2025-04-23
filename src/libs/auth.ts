export default function getAccessToken() {
  if (typeof window !== 'undefined') {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')

      return user.accessToken || null
    } catch (error) {
      console.error('Error retrieving access token:', error)

      return null
    }
  }

  return null
}
