'use client'

import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import NewsItem from '@/features/news/components/NewsItem';
import { HackerStory } from '@/types';
import toast, { Toaster } from 'react-hot-toast';
import { FaSpinner } from 'react-icons/fa';
import { AnimatePresence } from 'framer-motion';
import { getNewsGqlClient } from '@/lib/graphql/queries';

export default function NewsGql() {
    const { data: news, isRefetching, isLoading, refetch } = useQuery<HackerStory[]>({ 
        queryKey: ['newsGql'], 
        queryFn: getNewsGqlClient,
    })

    useEffect(() => {
        refetch()
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
                Loading Gql News...
            </h1>
          </div> 
        );
      }

    return (
        <div className='flex flex-col items-center justify-center'>
            <AnimatePresence>
                {news?.map(newsItem => (
                    <NewsItem key={`${newsItem.id}_${newsItem.authorId}`} newsItem={newsItem} />
                ))}
            </AnimatePresence>
            <Toaster />
        </div>
    )
}