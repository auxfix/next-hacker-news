'use client';
import Button from '@/components/Button';
import Link from 'next/link'
import styles from './header.module.scss';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getAllLatestNewsClient_Light, getNewsClient } from '@/lib/query/queries';
import { HackerStory } from '@/types';
import { getNewsGql } from '@/lib/graphql/api';
import { useAppStore } from '@/lib/redux/hooks';
import { getNews } from '@/lib/redux/features/news';

interface HeaderProps {
  newsType: 'main' | 'gql' | 'redux' | 'vs'
}

interface Fetchers { [key: string]: () => any }


export const Header: React.FC<HeaderProps> = (props) => {
  const { newsType } = props;

  const store = useAppStore();
  const refetchNewsRedux = useCallback(() => {store.dispatch(getNews())}, []);

  const { refetch: mainNews } = useQuery<HackerStory[]>({ 
    queryKey: ['news'], 
    queryFn: getNewsClient,
  })

  const { refetch: newsGql } = useQuery({ 
    queryKey: ['newsGql'], 
    queryFn: async () => await getNewsGql(),
  })

  const { refetch: vsnews } = useQuery({ 
    queryKey: ['vsnews'], 
    queryFn: async () => await getAllLatestNewsClient_Light(),
  })

  const newsFetchers: Fetchers = {
    gql: newsGql,
    main: mainNews, 
    redux: refetchNewsRedux,
    vs: vsnews,
  }

  const getNewsCb = useCallback(() => {
    newsFetchers[newsType]();
  },[newsType]);


  return (
    <header className="inset-x-0 top-0 h-28 bg-darkblue fixed z-50">
      <div className={styles.container}>
        <Button onClick={getNewsCb}>{`Get more news (${newsType})`}</Button>    
      </div>
      <div className='absolute top-10 right-12'>
        <Link className='text-white font-bold text-2xl hover:underline' href="/dev">dev</Link>
      </div>
    </header>
  );
}
