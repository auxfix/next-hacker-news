'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import { HackerStory } from '@/types';
import { saveNews } from '@/query/serverQueries';

export default function Home() {
    const [news, setNews] = useState<string>('');
    const [dbNews, setDbNews] = useState<HackerStory[]>([]);

    const [ isLoadingBlob, loadNewsBlob ] = useLoading(async () => {
        const ftch = await fetch(
            `/api/news-export`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            },
        )
        const fileBlob = await ftch.blob()
        var link = document.createElement('a') 
        link.href = window.URL.createObjectURL(fileBlob)
        link.download = 'hackerNews.json'
        link.click()
        link.remove();
    });

    const [ isLoadingText, loadNewsText ] = useLoading(async () => {
        const ftch = await fetch(
            `/api/news-export`,
            {
                method: "GET",
                headers: {
                    "Content-type": "application/json"
                }
            },
        )
        const { newsItem } = await ftch.json();
        setDbNews(newsItem);
        setNews(JSON.stringify(newsItem, null, 2));
    });

  async function saveToDb() {
    await await fetch('/api/news-save', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ news: dbNews })
      });;
  }

  return (
    <main className='bg-palegray p-0 items-center flex flex-col'>
      <div className='flex h-20 w-full items-center justify-between'>
        <div className='flex items-center'>
            <h2 className='font-bold text-2xl pl-7 pr-10'>Export tab</h2>
            <button
                className='bg-blue-500 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex' 
                onClick={loadNewsBlob}>
                    {isLoadingBlob && <Loading />} Export top 10 rundom news 
            </button>
            <button
                className='bg-blue-500 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 flex' 
                onClick={loadNewsText}>
                    {isLoadingText && <Loading />} Get top 10 news 
            </button>
            <button
                className='bg-blue-500 h-10 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10 flex' 
                onClick={saveToDb}>
                     Save news to DB 
            </button>
        </div>
        <Link className='font-bold py-2 pr-7 rounded ml-10 flex text-black font-bold text-4xl' href="/">{'<-'}</Link>
      </div>

    <textarea 
        value={news}
        onChange={() => {}}
        style={{ minHeight: "calc(100vh - 20rem)" }}
        className="block h-full w-[98.5%] px-4 py-2 leading-tight bg-gray-100 border border-gray-300 
        rounded resize-none focus:outline-none focus:bg-white focus:border-blue-500" />
    </main>    
  );
}

function Loading(){
    return (<span className="mr-2">
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A8.001 8.001 0 013.707 7.707l2.586 2.586A6 6 0 105.414 17.9l-1.415-1.414z"></path>
    </svg>
  </span>)
}

function useLoading(loadHandler:  () => Promise<void>): [
    boolean, () => void
] {
    const [isLoading, setIsLoading] = useState(false);
    function doLoad() {
        setIsLoading(true);
        loadHandler().then(() => { setIsLoading(false); });
    }
    return [isLoading, doLoad];
}