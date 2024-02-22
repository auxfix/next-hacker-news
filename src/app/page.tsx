import Header from '@/components/Header';
import NewsItem from '@/features/news/components/NewsItem';

const hackerStoryMock =  {
  authorId: 12,
  id: 1,
  img: 'https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  karma: 3,
  num: 3,
  score: 10,
  time: 1708618644080,
  title: 'exiting news',
  url: 'https://www.google.com/search?q=hacker+news'
}



export default function Home() {
  const news = new Array(10).fill(hackerStoryMock);
  return (
    <main className='flex justify-center'>
      <Header />
      <div className='flex flex-col items-center justify-center w-2/3'>
        {news.map(newsItem => (
            <NewsItem key={newsItem.id} newsItem={newsItem} />
        ))}
      </div>
    </main>    
  );
}
