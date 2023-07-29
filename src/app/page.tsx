import NavHeader from "@/components/header/navHeader";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <NavHeader />
      <div className="pt-20">
        <div className="text-4xl font-extrabold">Jesse Gomez</div>
        <div>
          <Link href="/minesweeper">Minesweeper</Link>
        </div>
      </div>
    </>
  );
}
