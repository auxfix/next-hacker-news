import React from 'react';
import { Header } from '@/components/Header';
import StoreProvider from '../StoreProvider';
import VSProviders from '@/lib/providers';
import VScroll from '@/components/VScroll';


export default async function VirtualScrollHome() {
  return (
    <main className='bg-palegray'>
      <VSProviders>
        <StoreProvider>
          <Header
            newsType={'scroll'}
          />
          <VScroll />
        </StoreProvider>
        </VSProviders>
    </main>    
  );
}