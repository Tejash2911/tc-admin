import { useState } from 'react'

interface QueryI {
  search: string
  sort: string
  offset: number
  limit: number
  category: string
  status: string
}

const defaultQuery: QueryI = {
  search: '',
  sort: '',
  offset: 1,
  limit: 10,
  category: '',
  status: ''
}

export const useQuery = (initialQuery: Partial<QueryI> = {}) => {
  const [query, setQuery] = useState<QueryI>({ ...defaultQuery, ...initialQuery })

  const updateQuery = (updates: Partial<QueryI>) => {
    setQuery(prev => ({ ...prev, ...updates }))
  }

  return { query, updateQuery }
}
