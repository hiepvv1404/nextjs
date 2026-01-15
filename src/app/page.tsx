import Link from "next/link";

export default function Home() {
  return (
    <div>
      <ul>
        <li>
          <Link href={"/facebook"}>Facebook</Link>
        </li>
        <li>
          <Link href={"/youtube"}>Youtube</Link>
        </li>
        <li>
          <Link href={"/tiktok"}>TikTok</Link>
        </li>
      </ul>
    </div>
  );
}
