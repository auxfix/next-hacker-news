'use client';
import Button from '@/components/Button';
import Link from 'next/link'
import styles from './header.module.scss';
import { useQuery } from '@tanstack/react-query'

import { HackerStory } from '@/types';
import { getNewsClient } from '@/lib/query/queries'

export default function Header() {
  const { refetch } = useQuery<HackerStory[]>({ 
    queryKey: ['news'], 
    queryFn: getNewsClient,
  })
  return (
    <header className="inset-x-0 top-0 h-28 bg-darkblue fixed z-50">
      <div className={styles.container}>
        <Button onClick={() => refetch()}>Get more news</Button>    
      </div>
      <div className='absolute top-10 right-12'>
        <Link className='text-white font-bold text-2xl hover:underline' href="/dev">dev</Link>
      </div>
    </header>
  );
}
