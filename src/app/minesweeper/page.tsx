import Minesweeper from "@/components/minesweeper/minesweeper";

export default function MinesweeperPage() {
  return (
    <>
      <div>React Minesweeper</div>
      <main className="flex min-h-screen justify-center py-24">
        <Minesweeper />
      </main>
    </>
  );
}
