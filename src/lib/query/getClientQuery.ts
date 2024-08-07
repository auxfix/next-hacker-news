import { QueryClient } from '@tanstack/react-query'
import { cache } from 'react';

export const getSsrQueryClient = cache(() => new QueryClient({
    defaultOptions: {  
      queries: {
        staleTime: 6000,
        enabled: false,
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
      enabled: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }}
)

export const getVsQueryClient = () => new QueryClient({
  defaultOptions: {  
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  }}
)