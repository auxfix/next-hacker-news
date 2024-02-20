'use client';
import Button from '@/components/Button';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.wrapper}>
      <div className={styles.container}>
        <Button onClick={() => console.log('i was clicked')}>Get more news</Button>
      </div>
    </header>
  );
}
