'use client'

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import NewsItem from '@/features/news/components/NewsItem';
import { HackerStory } from '@/types';
import { getNewsClient } from '@/lib/query/queries'
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';

export default function News() {
    const { data: news, isRefetching, isLoading } = useQuery<HackerStory[]>({ 
        queryKey: ['news'], 
        queryFn: getNewsClient,
    })

    const queryClient = useQueryClient();

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
            <AnimatePresence>
                {news?.map(newsItem => (
                    <NewsItem
                        removeCallback={(newsItemId) => {
                            queryClient.setQueryData(['news'], (news: HackerStory[]) =>
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