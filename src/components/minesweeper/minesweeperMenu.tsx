import { MinesweeperMode } from "./types";

export default function MinesweeperMenu({
  widthInput,
  heightInput,
  minesInput,
  mode,
  toggleMode,
  handleReset,
  handleInputChange,
}: {
  widthInput: number;
  heightInput: number;
  minesInput: number;
  mode: MinesweeperMode;
  toggleMode: () => void;
  handleReset: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="p-1">
        Mode: {mode === "flag" ? "Flagging" : "Revealing"}
        <button
          className="border border-black dark:border-white rounded m-1 p-1 hover:border-orange-500"
          onClick={toggleMode}
        >
          Toggle Flagging
        </button>
      </label>
      <label className="p-1">
        Width:{" "}
        <input
          className="border rounded p-1 dark:bg-black"
          type="number"
          name="width"
          value={widthInput}
          onChange={handleInputChange}
        />
      </label>
      <label className="p-1">
        Height:{" "}
        <input
          className="border rounded p-1 dark:bg-black"
          type="number"
          name="height"
          value={heightInput}
          onChange={handleInputChange}
        />
      </label>
      <label className="p-1">
        Mines:{" "}
        <input
          className="border rounded p-1 dark:bg-black"
          type="number"
          name="mines"
          value={minesInput}
          onChange={handleInputChange}
        />
      </label>
      <button
        className="border border-black dark:border-white rounded m-1 p-1 hover:border-orange-500"
        onClick={handleReset}
      >
        Reset Game
      </button>
    </div>
  );
}
