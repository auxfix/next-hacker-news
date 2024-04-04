'use client'

import React, { useState } from 'react';

export default function Home() {
    const [news, setNews] = useState<string>('');

    async function retrieveFileBlob() {
        try {
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
        } catch (e) {
            console.log({ "message": e, status: 400 })  // handle error
        }
    }

    async function getNew() {
        try {
            const ftch = await fetch(
                `/api/news-export`,
                {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json"
                    }
                },
            )
            const { newsItem } = await ftch.json()
            setNews(JSON.stringify(newsItem, null, 2)); 
        } catch (e) {
            console.log({ "message": e, status: 400 })  // handle error
        }
    }

  return (
    <main className='bg-palegray'>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' 
        onClick={retrieveFileBlob}
      >Export top 10 rundom news</button>
      <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-10' 
        onClick={getNew}
      >Get top 10 news</button>


<textarea 
    value={news}
    style={{ minHeight: "calc(100vh - 10rem)" }}
className="block w-full h-full px-4 py-2 leading-tight bg-gray-100 border border-gray-300 rounded resize-none focus:outline-none focus:bg-white focus:border-blue-500">

</textarea>
    </main>    
  );
}