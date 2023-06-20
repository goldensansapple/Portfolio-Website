"use client";

import { Reducer, useReducer } from "react";
import {
  isValidDimension,
  newMinesweeperGrid,
  revealEmpties,
} from "./controller";
import {
  MinesweeperAction,
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
    .map((x) => Array<MinesweeperCellType>(10).fill("hidden")),
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

const reducer: Reducer<MinesweeperState, MinesweeperAction> = (
  state: MinesweeperState,
  action: MinesweeperAction
): MinesweeperState => {
  const nextState: MinesweeperState = { ...state };

  switch (action.type) {
    case "CLICK": {
      if (state.gameState !== "playing") break;
      const { x, y } = action.coord;
      if (state.mode === "reveal") {
        if (state.grid[y][x] === "hidden") {
          if (state.trueGrid[y][x] === "mine") {
            nextState.gameState = "lose";
          }
          const { grid, hiddenRemoved } = revealEmpties(
            [...state.grid.map((row) => [...row])],
            state.trueGrid,
            state.width,
            state.height,
            x,
            y
          );
          nextState.grid = grid;
          nextState.hidden -= hiddenRemoved;
          if (nextState.minesFlagged == nextState.hidden) {
            nextState.gameState = "win";
          }
        }
      } else {
        switch (state.grid[y][x]) {
          case "hidden": {
            nextState.grid[y][x] = "flag";
            nextState.flags++;
            if (state.trueGrid[y][x] === "mine") {
              nextState.minesFlagged++;
            }
            break;
          }
          case "flag": {
            nextState.grid[y][x] = "hidden";
            nextState.flags--;
            if (state.trueGrid[y][x] === "mine") {
              nextState.minesFlagged--;
            }
            break;
          }
        }
      }

      break;
    }

    case "CHANGE_MODE": {
      nextState.mode = state.mode === "reveal" ? "flag" : "reveal";

      break;
    }

    case "CHANGE_WIDTH": {
      if (isNaN(action.width)) break;
      nextState.widthInput = action.width;

      break;
    }

    case "CHANGE_HEIGHT": {
      if (isNaN(action.height)) break;
      nextState.heightInput = action.height;

      break;
    }

    case "CHANGE_MINES": {
      if (isNaN(action.mines)) break;
      nextState.minesInput = action.mines;

      break;
    }

    case "RESET": {
      nextState.width = state.widthInput;
      nextState.height = state.heightInput;
      nextState.grid = Array<Array<MinesweeperCellType>>(
        state.heightInput
      ).fill(Array(state.widthInput).fill("hidden"));
      nextState.mines = state.minesInput;
      nextState.trueGrid = newMinesweeperGrid(
        state.widthInput,
        state.heightInput,
        state.minesInput
      );
      nextState.flags = 0;
      nextState.minesFlagged = 0;
      nextState.hidden = state.widthInput * state.heightInput;
      nextState.gameState = "playing";

      nextState.widthInput = state.widthInput;
      nextState.heightInput = state.heightInput;
      nextState.minesInput = state.minesInput;

      break;
    }
  }

  return nextState;
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
    <div className="flex flex-col border border-black dark:border-white rounded p-1 overflow-x-scroll">
      <MinesweeperHeader mines={mines} flags={flags} gameState={gameState} />
      <div className="flex flex-col">
        <MinesweeperGrid grid={grid} handleClick={handleClick} />
        <MinesweeperMenu
          widthInput={widthInput}
          heightInput={heightInput}
          minesInput={minesInput}
          mode={mode}
          toggleMode={toggleMode}
          handleReset={handleReset}
          handleInputChange={handleInputChange}
        />
      </div>
    </div>
  );
}
