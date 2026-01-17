'use client';
import AppTable from '@/components/app.table';
import useSWR from 'swr';

const BlogPage = () => {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    'http://localhost:8000/blogs', // key
    fetcher, //fetch
    {
      // option: cấu hình để cache data tránh load lại nhiều lần khi chuyển trang qua lại dùng cho data ít thay đổi
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mt-3">
      <AppTable blogs={data?.sort((a: IBlog, b: IBlog) => b.id - a.id) ?? []} />
    </div>
  );
};

export default BlogPage;
