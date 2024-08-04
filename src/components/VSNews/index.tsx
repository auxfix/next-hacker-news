'use client'

import { useCallback, useEffect, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import NewsItem from '@/features/news/components/NewsItem';
import { HackerStory } from '@/types';
import { getAllLatestNewsClient_Light } from '@/lib/query/queries'
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { useAppSelector, useAppStore } from '@/lib/redux/hooks';
import { getNews, getNewsCountSelector, setNewsCount } from '@/lib/redux/features/news';

interface NewsQueryResult {
    allNewsCount: number;  
    news: HackerStory[]
}

export default function VSNews() {
    const queryClient = useQueryClient();
    const store = useAppStore();
    const newsCount = useAppSelector(getNewsCountSelector);
    const { data, isRefetching, isLoading } = useQuery<NewsQueryResult>({ 
        queryKey: ['vsnews'], 
        queryFn: async () => await getAllLatestNewsClient_Light(newsCount),
    })

    const updateNewsCount = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        store.dispatch(setNewsCount(+event.target.value))
    },[])

    useEffect(() => {
        if(isRefetching) {
            toast.loading('Getting latets news for you ...', {
                icon: <FaSpinner className="animate-spin" />,
                style: {
                  borderRadius: '10px',
                  background: '#333',
                  color: '#fff',
                  padding: '20px',
                  fontSize: '14px',
                },
              });
        } else {
            toast.remove();
        }       
    }, [isRefetching])

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
            <div className="rounded-xl shadow-xl flex flex-col items-center justify-center p-6 bg-gray-100 w-1/3 mt-6">
                <input 
                    type="number"
                    min={1}
                    max={500}
                    step={5}
                    className="text-xl w-72 h-16 p-4 mt-4 border-2 border-sky-500 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-600 focus:border-transparent"
                    value={newsCount} 
                    onChange={updateNewsCount}
                />
                <p className="mt-4 text-xl text-gray-700">
                    Total news on server: {data?.allNewsCount}
                </p>
            </div>
            <AnimatePresence>
                {data?.news?.map(newsItem => (
                    <NewsItem
                        showImage={false}
                        removeCallback={(newsItemId) => {
                            queryClient.setQueryData(['vsnews'], (news: HackerStory[]) =>
                                news.filter((newsItem: HackerStory) => newsItem.id !== newsItemId),
                              );
                        }} 
                        key={`${newsItem.id}_${newsItem.authorId}`} newsItem={newsItem} />
                ))}
            </AnimatePresence>
            <Toaster />
        </div>
    )
}