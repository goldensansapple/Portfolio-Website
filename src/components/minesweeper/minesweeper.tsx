"use client";

import { useReducer } from "react";
import {
  newMinesweeperGrid,
  reducer,
} from "./controller";
import {
  MinesweeperCellType,
  MinesweeperState,
} from "./types";
import MinesweeperGrid from "./minesweeperGrid";
import MinesweeperMenu from "./minesweeperMenu";
import MinesweeperHeader from "./minesweeperHeader";

const initalState: MinesweeperState = {
  width: 10,
  height: 10,
  grid: Array<Array<MinesweeperCellType>>(10)
    .fill([0])
    .map(() => Array<MinesweeperCellType>(10).fill("hidden")),
  trueGrid: newMinesweeperGrid(10, 10, 10),
  mines: 10,
  flags: 0,
  minesFlagged: 0,
  hidden: 100,
  mode: "reveal",
  gameState: "playing",

  widthInput: 10,
  heightInput: 10,
  minesInput: 10,
  errorMessage: "",
};


export default function Minesweeper() {
  const [state, dispatch] = useReducer(reducer, initalState);
  const {
    grid,
    mines,
    flags,
    mode,
    gameState,
    widthInput,
    heightInput,
    minesInput,
    errorMessage,
  } = state;

  const handleClick = (x: number, y: number) => {
    dispatch({ type: "CLICK", coord: { x, y } });
  };

  const toggleMode = () => {
    dispatch({
      type: "CHANGE_MODE",
    });
  };

  const handleReset = () => {
    dispatch({ type: "RESET" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "width": {
        dispatch({ type: "CHANGE_WIDTH", width: parseInt(e.target.value) });
        break;
      }
      case "height": {
        dispatch({ type: "CHANGE_HEIGHT", height: parseInt(e.target.value) });
        break;
      }
      case "mines": {
        dispatch({ type: "CHANGE_MINES", mines: parseInt(e.target.value) });
        break;
      }
    }
  };

  return (
    <div className="flex flex-col bg-slate-50 border border-black rounded p-1 overflow-x-scroll">
      <MinesweeperHeader mines={mines} flags={flags} gameState={gameState} />
      <div className="flex flex-col">
        <MinesweeperGrid grid={grid} handleClick={handleClick} />
        <MinesweeperMenu
          widthInput={widthInput}
          heightInput={heightInput}
          minesInput={minesInput}
          mode={mode}
          errorMessage={errorMessage}
          toggleMode={toggleMode}
          handleReset={handleReset}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
