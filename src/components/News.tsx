'use client'

import { useQuery } from '@tanstack/react-query'
import NewsItem from '@/features/news/components/NewsItem';
import { HackerStory } from '@/types';
import { getNewsQuery } from '@/query/queries'

export default function News() {
    const { data: news } = useQuery<HackerStory[]>({ queryKey: ['posts'], queryFn: getNewsQuery })
    return (
        <div className='flex flex-col items-center justify-center'>
            {news?.map(newsItem => (
                <NewsItem key={newsItem.id} newsItem={newsItem} />
            ))}
        </div>
    )
}