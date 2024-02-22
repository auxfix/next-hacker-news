import { getFormattedTimeForNews } from '@/features/news/utils';
import { HackerStory } from '@/types';

import styles from './newsItem.module.scss';

interface NewsProps {
  newsItem: HackerStory;
}

export default function NewsItem(props: NewsProps) {
  const { newsItem } = props;

  const { monthDateYear, weekDay } = getFormattedTimeForNews(newsItem.time);

  return (
    <div key={newsItem.id} className={styles.container} data-testid="NewsItem">
      <img alt="News cover" className={styles.image} src={newsItem.img} />
      <div className={styles.info}>
        <div className={styles.time}>
          <span>{`# ${newsItem.num}`}</span>
          <span data-testid="day">{weekDay}</span>
          <span data-testid="monthDateYear">{monthDateYear}</span>
        </div>
        <h1 className={styles.title} data-testid="title">
          {newsItem.title}
        </h1>
        <div className={styles.infoblock}>
          <div className={styles.text}>
            <span>Story score:</span>
            <span data-testid="score">{newsItem.score}</span>
          </div>
          <div className={styles.text}>
            <span>Author:</span>
            <span data-testid="author">{newsItem.authorId}</span>
          </div>
          <div className={styles.text}>
            <span>Author Karma:</span>
            <span data-testid="karma">{newsItem.karma}</span>
          </div>
        </div>

        <a
          className={styles.readmore}
          data-testid="link"
          href={newsItem.url}
          rel="noreferrer"
          target="_blank"
        >
          Read more
        </a>
      </div>
    </div>
  );
}
