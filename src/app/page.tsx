'use client';
import Link from 'next/link';
import y from '@/styles/hoidanit.module.css';
import AppTable from '@/components/app.table';
import { useEffect } from 'react';

export default function Home() {
  const res = fetch('http://localhost:8000/blogs');
  console.log(res);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/blogs');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

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
      <AppTable />
    </div>
  );
}
