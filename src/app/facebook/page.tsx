'use client';
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';

const FacebookPage = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push('/');
  };

  return (
    <>
      <h1>Facebook Page</h1>
      <div>
        <Button variant="primary">Hoidanit</Button>
        <button
          onClick={() => {
            handleBack();
          }}
        >
          Back
        </button>
      </div>
    </>
  );
};

export default FacebookPage;
