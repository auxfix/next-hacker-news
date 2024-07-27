'use client';
import Button from '@/components/Button';
import Link from 'next/link'
import styles from './header.module.scss';
import { useQuery } from '@tanstack/react-query'

import { HackerStory } from '@/types';
import { getNewsGqlClient } from '@/lib/graphql/queries';
import { getNewsGql } from '@/lib/graphql/api';

export default function HeaderGql() {
  const { refetch } = useQuery({ 
    queryKey: ['newsGql'], 
    queryFn: async () => await getNewsGql(),
  })
  return (
    <header className="inset-x-0 top-0 h-28 bg-darkblue fixed z-50">
      <div className={styles.container}>
        <Button onClick={() => refetch()}>Get more of GQL news</Button>    
      </div>
      <div className='absolute top-10 right-12'>
        <Link className='text-white font-bold text-2xl hover:underline' href="/dev">back</Link>
      </div>
    </header>
  );
}
