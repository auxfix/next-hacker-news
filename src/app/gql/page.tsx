import React from 'react';
import NewsGql from '@/components/NewsGql';
import { getSsrQueryClient } from '@/lib/query/getClientQuery';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getNewsServer } from '@/lib/query/queries';
import { Header } from '@/components/Header';
import StoreProvider from '../StoreProvider';
export default async function Gql() {
  const queryClient = getSsrQueryClient();
  await queryClient.prefetchQuery({ 
    queryKey: ['newsGql'], 
    queryFn: async () => {
      let news = await getNewsServer();
      return {
        news,
      }
    },
  });


  const dehydratedState = dehydrate(queryClient);

  return (
    <main className='bg-palegray'>
      <StoreProvider>
        <HydrationBoundary state={dehydratedState}>
            <Header 
              newsType={'gql'}
            />
            <NewsGql />
          </HydrationBoundary>
      </StoreProvider>
    </main>    
  );
}