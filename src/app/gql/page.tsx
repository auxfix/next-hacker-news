import React from 'react';

import NewsGql from '@/components/NewsGql';
import HeaderGql from '@/components/HeaderGql';
import { getSsrQueryClient } from '@/lib/query/getClientQuery';
import { getNewsGql } from '@/lib/graphql/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function Gql() { 
  const queryClient = getSsrQueryClient();
  await queryClient.prefetchQuery({ 
    queryKey: ['newsGql'], 
    queryFn: () => getNewsGql(),
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