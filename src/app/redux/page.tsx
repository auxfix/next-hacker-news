import React from 'react';

import ReduxNews from '@/components/ReduxNews';
import StoreProvider from '../StoreProvider';
import ReduxHeader from '@/components/ReduxHeader';

export default async function Redux() {
  return (
    <main className='bg-palegray'>
      <StoreProvider>
        <ReduxHeader />
        <ReduxNews />
      </StoreProvider>
    </main>    
  );
}
