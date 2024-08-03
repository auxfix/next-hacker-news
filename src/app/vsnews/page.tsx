import React from 'react';
import { Header } from '@/components/Header';
import VSNews from '@/components/VSNews';
import StoreProvider from '../StoreProvider';
import VSProviders from '@/lib/providers';


export default async function VirtualScrollHome() {
  return (
    <main className='bg-palegray'>
      <VSProviders>
        <StoreProvider>
          <Header
            newsType={'vs'}
          />
          <VSNews />
        </StoreProvider>
        </VSProviders>
    </main>    
  );
}