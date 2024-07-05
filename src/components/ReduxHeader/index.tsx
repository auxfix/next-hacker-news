'use client';
import Button from '@/components/Button';
import Link from 'next/link'
import styles from './header.module.scss';
import { useCallback } from 'react';
import { useAppStore } from '@/lib/redux/hooks';
import { getNews } from '@/lib/redux/features/news';

export default function ReduxHeader() {
  const store = useAppStore();
  const refetchNews = useCallback(() => {store.dispatch(getNews())}, []);

  return (
    <header className="inset-x-0 top-0 h-28 bg-darkblue fixed z-50">
      <div className={styles.container}>
        <Button onClick={refetchNews}>Get more news(redux)</Button>    
      </div>
      <div className='absolute top-10 right-12'>
        <Link className='text-white font-bold text-2xl hover:underline' href="/dev">dev</Link>
      </div>
    </header>
  );
}
