import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="text-4xl font-extrabold">Jesse Gomez&apos;s Portfolio</div>
      <div>
        <Link href="/minesweeper">Minesweeper</Link>
      </div>
    </div>
  );
}
