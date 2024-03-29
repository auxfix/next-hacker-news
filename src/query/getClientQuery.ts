import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

export const getSsrQueryClient = cache(() => new QueryClient({
    defaultOptions: {  
      queries: {
        staleTime: 6000,
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    }}
  )
)

export const getQueryClient = () => new QueryClient({
  defaultOptions: {  
    queries: {
      staleTime: 6000,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }}
)