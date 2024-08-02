import { getFormattedTimeForNews } from '@/features/news/utils';
import { HackerStory } from '@/types';
import { useCallback } from 'react';
import { motion } from 'framer-motion';
import  './newsItem.scss';

interface NewsProps {
  newsItem: HackerStory;
  key: string;
  removeCallback: (nid: number) => void,
  showImage: boolean,
}

NewsItem.defaultProps = {
  showImage: true,
}

export default function NewsItem({
  key, 
  newsItem, 
  removeCallback,
  showImage = true,
}: NewsProps) {
  
  const { id: newsItemId } = newsItem;
  const { monthDateYear, weekDay } = getFormattedTimeForNews(newsItem.time);

  const removeNI = useCallback(() => {
    removeCallback(newsItemId);
  }, [newsItemId]);

  return (
      <motion.div
        key={key}
        whileHover={{
          scale: 1.06,
          transition: { duration: 0.2 },
        }}
        exit={{
          scale: 0.5,
          opacity: 0,
          transition: { duration: 0.2 },
        }}
        className={'news-item-container' + (showImage ?  '' :' w-1/3')} 
        data-testid="NewsItem"
      >
        {showImage && <img alt="News cover" className='news-item-image' src={newsItem.img as string} />}
        <div className={'w-full'}>
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
              whileTap={{ 
                scale: 0.8,
                boxShadow: 'none', 
              }}
              whileHover={{
                boxShadow: '10px 10px 24px -11px rgba(0,0,0,0.75)',
                skew: '-20deg, 0',
                scaleX: 1.2,
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
              whileTap={{ 
                scale: 0.8,
              }}
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
      </motion.div>
  );
}
