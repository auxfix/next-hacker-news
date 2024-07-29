import React, { useCallback } from 'react';

import ReduxNews from '@/components/ReduxNews';
import StoreProvider from '../StoreProvider';
import { Header }  from '@/components/Header';

export default async function Redux() {
  return (
    <main className='bg-palegray'>
      <StoreProvider>
        <Header 
          newsType={'redux'}
        />
        <ReduxNews />
      </StoreProvider>
    </main>    
  );
}
