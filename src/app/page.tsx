import React from 'react';
import { dehydrate, HydrationBoundary  } from '@tanstack/react-query'
import { getQueryClient } from '../query/getClientQuery'

import Header from '@/components/Header';
import News from '@/components/News';

import { getNewsQuery } from '@/query/queries'

export default async function Home() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({ 
    queryKey: ['posts'], 
    queryFn: getNewsQuery
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <main className='bg-palegray'>
      <Header />
      <HydrationBoundary state={dehydratedState}>
        <News />
      </HydrationBoundary>
    </main>    
  );
}
