'use client'

import { useQuery } from '@tanstack/react-query'
import NewsItem from '@/features/news/components/NewsItem';
import { HackerStory } from '@/types';
import { getNewsQuery } from '@/query/queries'

export default function News() {
    const { data: news, isFetching  } = useQuery<HackerStory[]>({ queryKey: ['posts'], queryFn: getNewsQuery })

    if (isFetching) {
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
                <NewsItem key={newsItem.id} newsItem={newsItem} />
            ))}
        </div>
    )
}