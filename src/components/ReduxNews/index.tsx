'use client'

import { useRef } from 'react'
import NewsItem from '@/features/news/components/NewsItem';
import { Toaster } from 'react-hot-toast';
import { useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { getNews, getNewsLoadingSelector, getNewsSelector } from '@/lib/redux/features/news';
import ReduxNewsItem from '@/features/news/components/ReduxNewsItem';

export default function ReduxNews() {
  const store = useAppStore()
  const initialized = useRef(false);
  if (!initialized.current) {
    store.dispatch(getNews())
    initialized.current = true
  }
  const news = useAppSelector(getNewsSelector);
  const isLoading = useAppSelector(getNewsLoadingSelector);

  if (isLoading) {
    return (
      <div>
        <h1 className='absolute top-1/2 left-1/2 text-5xl font-bold
            bg-gradient-to-r from-blue-600 to-cyan-200 inline-block text-transparent bg-clip-text
            h-[5rem] -translate-x-[7rem]
        '>
            Loading...
        </h1>
      </div> 
    );
  }

    return (
        <div className='flex flex-col items-center justify-center'>
            {news?.map(newsItem => (
                <ReduxNewsItem key={`${newsItem.id}_${newsItem.authorId}`} newsItem={newsItem} />
            ))}
            <Toaster />
        </div>
    )
}