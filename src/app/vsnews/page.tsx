import React from 'react';
import { Header } from '@/components/Header';
import VSNews from '@/components/VSNews';
import StoreProvider from '../StoreProvider';


export default async function VirtualScrollHome() {
  return (
    <main className='bg-palegray'>
        <StoreProvider>
          <Header
            newsType={'vs'}
          />
          <VSNews />
        </StoreProvider>
    </main>    
  );
}