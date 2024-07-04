import React from 'react';

import Header from '@/components/Header';
import News from '@/components/News';

export default async function Redux() {
  return (
    <main className='bg-palegray'>
      <Header />
      <News />
    </main>    
  );
}
