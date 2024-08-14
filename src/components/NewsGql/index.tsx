'use client'

import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import NewsItem from '@/features/news/components/NewsItem';
import { HackerStory } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { getNewsGql } from '@/lib/graphql/api';

export default function NewsGql() {
    const { data, isRefetching, isLoading } = useQuery({ 
        queryKey: ['newsGql'], 
        queryFn: async () => await getNewsGql(),
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
                Loading Gql News...
            </h1>
          </div> 
        );
      }

    return (
        <div className='flex flex-col items-center justify-center'>
            <AnimatePresence>
                {data?.news.map(newsItem => (
                    <NewsItem
                        showImage={true}
                        removeCallback={(newsItemId) => {
                            queryClient.setQueryData(['newsGql'], (data: { news: HackerStory[] }) =>
                            ({ news: data?.news?.filter((newsItem: HackerStory) => newsItem.id !== newsItemId) }),
                            );
                        }}
                        key={`${newsItem.id}_${newsItem.authorId}`} newsItem={newsItem} />
                ))}
            </AnimatePresence>
            <Toaster />
        </div>
    )
}