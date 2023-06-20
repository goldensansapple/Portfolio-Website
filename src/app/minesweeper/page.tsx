import Minesweeper from "@/components/minesweeper/minesweeper";

export default function MinesweeperPage() {
  return (
    <>
      <div className="flex border-b border-gray-300 mb-2">
        <a className="p-4" href="/">Home</a>
      </div>
      <div className="text-4xl text-center mb-2">React Minesweeper</div>
      <main className="flex justify-center">
        <Minesweeper />
      </main>
    </>
  );
}
