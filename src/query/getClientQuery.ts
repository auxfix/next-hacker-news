import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const getQueryClient = cache(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: Infinity, // 1 hour in ms
        refetchOnWindowFocus: false, // Disables automatic refetching when browser window is focused.
      }
    }}
  )
)