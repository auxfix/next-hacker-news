import { getFormattedTimeForNews } from '@/features/news/utils';
import { HackerStory } from '@/types';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import  './newsItem.scss';

interface NewsProps {
  newsItem: HackerStory;
}

export default function NewsItem(props: NewsProps) {
  const queryClient = useQueryClient();
  const { newsItem } = props;
  const { id: newsItemId } = newsItem;
  const { monthDateYear, weekDay } = getFormattedTimeForNews(newsItem.time);

  const removeNI = useCallback(() => {
    queryClient.setQueryData(['news'], (news: HackerStory[]) =>
      news.filter((newsItem: HackerStory) => newsItem.id !== newsItemId),
    );
  }, [newsItemId]);

  return (
    <div key={newsItem.id} className='news-item-container' data-testid="NewsItem">
      <img alt="News cover" className='news-item-image' src={newsItem.img as string} />
      <div className='w-full'>
        <div>
          <span className='time-span'>{`# ${newsItem.num}`}</span>
          <span className='time-span' data-testid="day">{weekDay}</span>
          <span className='time-span' data-testid="monthDateYear">{monthDateYear}</span>
        </div>
        <h1 className='text-lightblue text-4xl uppercase mt-[1.5rem] mb-[2rem]' data-testid="title">
          {newsItem.title}
        </h1>
        <div className='border-y-[0.2rem] border-bluegradientstart py-[0.8rem] w-1/2'>
          <div>
            <span className='data-span mr-[3rem] font-bold'>Story score:</span>
            <span className='data-span' data-testid="score">{newsItem.score}</span>
          </div>
          <div>
            <span className='data-span mr-[3rem] font-bold'>Author:</span>
            <span className='data-span' data-testid="author">{newsItem.authorId}</span>
          </div>
          <div>
            <span className='data-span mr-[3rem] font-bold'>Author Karma:</span>
            <span className='data-span' data-testid="karma">{newsItem.karma}</span>
          </div>
        </div>
        <div className='w-full flex justify-between'>
          <motion.a
            whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
            className='read-more'
            data-testid="link"
            href={newsItem.url as string}
            rel="noreferrer"
            target="_blank"
          >
            Read more
          </motion.a>
          <motion.a
            whileHover={{
              scale: 1.2,
              rotate: 180,
              transition: { duration: 0.2 },
            }}
            className='delete cursor-pointer'
            data-testid="link"
            rel="noreferrer"
            onClick={removeNI}
          >
            X
          </motion.a>
        </div>
      </div>
    </div>
  );
}
