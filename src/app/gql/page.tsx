import React from 'react';

import NewsGql from '@/components/NewsGql';
import HeaderGql from '@/components/HeaderGql';

export default function Gql() {
  return (
    <main className='bg-palegray'>
        <HeaderGql />
        <NewsGql />
    </main>    
  );
}