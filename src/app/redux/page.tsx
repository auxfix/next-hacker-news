import React, { useCallback } from 'react';

import ReduxNews from '@/components/ReduxNews';
import StoreProvider from '../StoreProvider';
import { Header }  from '@/components/Header';
import { DefaultProviders } from '@/lib/providers';

export default async function Redux() {
  return (
    <main className='bg-palegray'>
      <DefaultProviders>
        <StoreProvider>
          <Header 
            newsType={'redux'}
          />
          <ReduxNews />
        </StoreProvider>
      </DefaultProviders>
    </main>    
  );
}
