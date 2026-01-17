'use client';
import Link from 'next/link';
import y from '@/styles/hoidanit.module.css';

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href={'/facebook'}>
            <span className={y['red']}>Facebook</span>
          </Link>
        </li>
        <li>
          <Link href={'/youtube'}>Youtube</Link>
        </li>
        <li>
          <Link href={'/tiktok'}>TikTok</Link>
        </li>
      </ul>
    </div>
  );
}
