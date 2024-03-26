import React, { useState } from 'react';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

import Header from '@/components/Header';
import NewsItem from '@/features/news/components/NewsItem';
import rundom_images from '@/features/news/assets/img/rundom_huckers_images';

const hackerStoryMock =  {
  authorId: 12,
  id: 1,
  img: rundom_images[2].src,
  karma: 3,
  num: 3,
  score: 10,
  time: 1708618644080,
  title: 'exiting news',
  url: 'https://www.google.com/search?q=hacker+news'
}



export default function Home() {
  const [queryClient] = useState(() => new QueryClient())
  const news = new Array(10).fill(hackerStoryMock);

  return (
<<<<<<< HEAD
    <main>
      <QueryClientProvider client={queryClient}>
        <Header />
          <div className='flex flex-col items-center justify-center'>
            {news.map(newsItem => (
                <NewsItem key={newsItem.id} newsItem={newsItem} />
            ))}
          </div>
      </QueryClientProvider>
=======
    <main className='bg-palegray'>
      <Header />
      <div className='flex flex-col items-center justify-center'>
        {news.map(newsItem => (
            <NewsItem key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
>>>>>>> 246913a4e1c06390ee7f8b7e6a9620872c2c4879
    </main>    
  );
}
