import NavHeader from "@/components/header/navHeader";
import Minesweeper from "@/components/minesweeper/minesweeper";

export default function MinesweeperPage() {
  return (
    <>
      <NavHeader />
      <div className="pt-20">
        <div className="text-4xl text-center mb-2 font-extrabold">
          React Minesweeper
        </div>
        <noscript>
          <style>{`
            .requires-js {
              display: none;
            }
          `}</style>
          <div className="text-center font-bold">
            This game requires JavaScript to be enabled in your browser.
          </div>
        </noscript>
        <main className="flex justify-center requires-js">
          <Minesweeper />
        </main>
      </div>
    </>
  );
}
