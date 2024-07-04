import React from 'react';

import Header from '@/components/Header';
import ReduxNews from '@/components/ReduxNews';
import StoreProvider from '../StoreProvider';

export default async function Redux() {
  return (
    <main className='bg-palegray'>
      <Header />
      <StoreProvider>
        <ReduxNews />
      </StoreProvider>
    </main>    
  );
}
