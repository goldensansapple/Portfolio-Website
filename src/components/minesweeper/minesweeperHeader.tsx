import { MinesweeperGameState } from "./types";

export default function MinesweeperHeader({
  mines,
  flags,
  gameState,
}: {
  mines: number;
  flags: number;
  gameState: MinesweeperGameState;
}) {
  let resultText = null;
  switch (gameState) {
    case "win": {
      resultText = <p className="p-1">You won!</p>;
      break;
    }
    case "lose": {
      resultText = <p className="p-1">You lost</p>;
      break;
    }
  }

  return (
    <div className="flex flex-row justify-center">
      <p className="p-1">Mines: {mines}</p>
      <p className="p-1">Flags: {flags}</p>
      {resultText}
    </div>
  );
}
