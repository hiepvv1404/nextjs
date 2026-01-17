'use client';
import Link from 'next/link';
import y from '@/styles/hoidanit.module.css';
import AppTable from '@/components/app.table';
import { useEffect } from 'react';
import useSWR from 'swr';

export default function Home() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR('http://localhost:8000/blogs', fetcher, {
    // cấu hình để cache data tránh load lại nhiều lần khi chuyển trang qua lại dùng cho data ít thay đổi
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('http://localhost:8000/blogs');
  //       const data = await response.json();
  //       console.log(data);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []);

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
