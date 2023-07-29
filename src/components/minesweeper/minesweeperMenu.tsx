import  Button  from "../button/button";
import { MinesweeperMode } from "./types";

export default function MinesweeperMenu({
  widthInput,
  heightInput,
  minesInput,
  mode,
  errorMessage,
  toggleMode,
  handleReset,
  handleInputChange,
}: {
  widthInput: number;
  heightInput: number;
  minesInput: number;
  mode: MinesweeperMode;
  errorMessage: string;
  toggleMode: () => void;
  handleReset: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col">
      <label className="p-1">
        Mode: {mode === "flag" ? "Flagging" : "Revealing"}
        <Button text="Toggle Flagging" onClick={toggleMode} />
      </label>
      <label className="p-1">
        Width:{" "}
        <input
          className="border rounded p-1"
          type="number"
          name="width"
          value={widthInput}
          onChange={handleInputChange}
        />
      </label>
      <label className="p-1">
        Height:{" "}
        <input
          className="border rounded p-1"
          type="number"
          name="height"
          value={heightInput}
          onChange={handleInputChange}
        />
      </label>
      <label className="p-1">
        Mines:{" "}
        <input
          className="border rounded p-1"
          type="number"
          name="mines"
          value={minesInput}
          onChange={handleInputChange}
        />
      </label>
      <div className="text-red-500">{errorMessage}</div>
      <Button onClick={handleReset} text="Reset" />
    </div>
  );
}
