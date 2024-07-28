import React from 'react';

import NewsGql from '@/components/NewsGql';
import HeaderGql from '@/components/HeaderGql';
import { getSsrQueryClient } from '@/lib/query/getClientQuery';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getNewsServer } from '@/lib/query/queries';

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
        <HeaderGql />
        <HydrationBoundary state={dehydratedState}>
          <NewsGql />
        </HydrationBoundary>
    </main>    
  );
}