'use client'

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/query/getClientQuery'

export default function Providers({ children }: any) {
  const [queryClient] = React.useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}