'use client';
import Button from '@/components/Button';
import styles from './header.module.scss';
import { useQuery } from '@tanstack/react-query'

import { HackerStory } from '@/types';
import { getNewsQuery } from '@/query/queries'

export default function Header() {
  const { refetch } = useQuery<HackerStory[]>({ 
    queryKey: ['posts'], 
    queryFn: getNewsQuery,
    retryOnMount: false,
    staleTime: Infinity, 
  })
  return (
    <header className="inset-x-0 top-0 h-28 bg-darkblue fixed z-50">
      <div className={styles.container}>
        <Button onClick={() => refetch()}>Get more news</Button>
      </div>
    </header>
  );
}
