"use client";
import { useRouter } from "next/navigation";

const FacebookPage = () => {
  const router = useRouter();
  const handleBack = () => {
    router.push("/");
  };

  return (
    <>
      <h1>Facebook Page</h1>
      <div>
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
