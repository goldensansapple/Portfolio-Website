import Minesweeper from "@/components/minesweeper/minesweeper";
import Link from "next/link";

export default function MinesweeperPage() {
  return (
    <>
      <div className="flex border-b border-gray-300 mb-2">
        <Link className="p-4" href="/">Home</Link>
      </div>
      <div className="text-4xl text-center mb-2">React Minesweeper</div>
      <main className="flex justify-center">
        <Minesweeper />
      </main>
    </>
  );
}
