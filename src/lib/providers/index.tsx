'use client'

import React from 'react';
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient, getVsQueryClient } from '@/lib/query/getClientQuery'

export function DefaultProviders({ children }: any) {
  const [queryClient] = React.useState(() => getQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

export default function VSProviders({ children }: any) {
  const [queryClient] = React.useState(() => getVsQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}