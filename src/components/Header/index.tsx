'use client';
import Button from '@/components/Button';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className="inset-x-0 top-0 h-28 bg-darkblue fixed z-50">
      <div className={styles.container}>
        <Button onClick={() => console.log('i was clicked')}>Get more news</Button>
      </div>
    </header>
  );
}
