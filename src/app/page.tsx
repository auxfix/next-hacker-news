import React from 'react';
import { dehydrate, HydrationBoundary  } from '@tanstack/react-query'
import { getSsrQueryClient } from '@/lib/query/getClientQuery'

import { Header } from '@/components/Header';
import News from '@/components/News';

import { getNewsServer } from '@/lib/query/queries'
import { getNewsGql } from '@/lib/graphql/api';
import StoreProvider from './StoreProvider';
export default async function Home() {
  const queryClient = getSsrQueryClient();

  await queryClient.prefetchQuery({ 
    queryKey: ['news'], 
    queryFn: getNewsServer,
  });
  await queryClient.prefetchQuery({ 
    queryKey: ['newsGql'], 
    queryFn: () => getNewsGql(),
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <main className='bg-palegray'>
      <StoreProvider>
        <HydrationBoundary state={dehydratedState}>
          <Header
            newsType={'main'}
          />

          <News />
        </HydrationBoundary>
      </StoreProvider>
    </main>    
  );
}
