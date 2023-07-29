import { Reducer } from "react";
import { MinesweeperAction, MinesweeperCellType, MinesweeperState } from "./types";
import { convertTo2DArray, shuffle } from "./util/array";

const surrounding8 = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
];

/**
 * Create a new minesweeper grid.
 * @param width The width of the grid.
 * @param height The height of the grid.
 * @param mines The number of mines in the grid.
 * @returns An array of the new minesweeper grid.
 */
export function newMinesweeperGrid(
  width: number,
  height: number,
  mines: number
): Array<Array<MinesweeperCellType>> {
  const size = width * height;
  const grid1D = Array<MinesweeperCellType>(size)
    .fill("mine", 0, mines)
    .fill(0, mines, size);

  shuffle(grid1D);

  const grid = convertTo2DArray(grid1D, width);

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      if (grid[y][x] === "mine") {
        for (const [dx, dy] of surrounding8) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
          if (typeof grid[ny][nx] === "number") {
            (grid[ny][nx] as number)++;
          }
        }
      }
    }
  }

  return grid;
}

/**
 * Reveal the given cell and, if it is empty, all empty cells around the cell.
 * @param grid The grid to reveal the cell in.
 * @param trueGrid The grid with the true values of the cells.
 * @param width The width of the grid.
 * @param height The height of the grid.
 * @param initalX The x coordinate of the cell to reveal.
 * @param initalY The y coordinate of the cell to reveal.
 * @returns An object containing the new grid and the number of hidden cells removed.
 */
export function revealEmpties(
  grid: MinesweeperCellType[][],
  trueGrid: MinesweeperCellType[][],
  width: number,
  height: number,
  initalX: number,
  initalY: number
): { newGrid: MinesweeperCellType[][]; hiddenRemoved: number } {
  const newGrid = [...grid.map((row) => [...row])];
  const queue = [{ x: initalX, y: initalY }];
  let hiddenRemoved = 0;
  while (queue.length > 0) {
    const { x, y } = queue.pop()!!;
    newGrid[y][x] = trueGrid[y][x];
    hiddenRemoved++;
    if (trueGrid[y][x] === 0) {
      for (const [dx, dy] of surrounding8) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        if (
          newGrid[ny][nx] === "hidden" &&
          queue.find((c) => c.x === nx && c.y === ny) === undefined
        ) {
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
  return { newGrid, hiddenRemoved };
}

/**
 * Reveal all mines in the grid.
 * 
 * @param grid The grid to reveal the mines in.
 * @param trueGrid The grid with the true values of the cells.
 * @returns The new grid with all mines revealed.
 */
export function revealAllMines(
  grid: MinesweeperCellType[][],
  trueGrid: MinesweeperCellType[][]
): MinesweeperCellType[][] {
  const newGrid = [...grid.map((row) => [...row])];
  for (let y = 0; y < trueGrid.length; y++) {
    for (let x = 0; x < trueGrid[y].length; x++) {
      if (trueGrid[y][x] === "mine") {
        newGrid[y][x] = "mine";
      }
    }
  }
  return newGrid;
}

/**
 * Validate that width, height, and mines are all greater than or equal to 1.
 * 
 * @param width 
 * @param height 
 * @param mines 
 * @returns True if the dimensions are valid, false otherwise.
 */
export function isValidDimension(
  width: number,
  height: number,
  mines: number
): boolean {
  return width >= 1 && height >= 1 && mines >= 1;
}

/**
 * Reducer for the minesweeper game.
 * 
 * @param state The current state of the game.
 * @param action The action to perform.
 * @returns The new state of the game.
 */
export const reducer: Reducer<MinesweeperState, MinesweeperAction> = (
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
            nextState.grid = revealAllMines(state.grid, state.trueGrid);
            nextState.grid[y][x] = "exploded";
            nextState.gameState = "lose";
          } else {
            const { newGrid, hiddenRemoved } = revealEmpties(
              state.grid,
              state.trueGrid,
              state.width,
              state.height,
              x,
              y
            );
            nextState.grid = newGrid;
            nextState.hidden -= hiddenRemoved;
            if (nextState.minesFlagged == nextState.hidden) {
              nextState.gameState = "win";
            }
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
      nextState.widthInput = action.width;

      break;
    }

    case "CHANGE_HEIGHT": {
      nextState.heightInput = action.height;

      break;
    }

    case "CHANGE_MINES": {
      nextState.minesInput = action.mines;

      break;
    }

    case "RESET": {
      if (
        isNaN(state.widthInput) ||
        isNaN(state.heightInput) ||
        isNaN(state.minesInput) ||
        !isValidDimension(state.widthInput, state.heightInput, state.minesInput)
      ) {
        nextState.errorMessage =
          "Invalid input: width, height and mine count must be greater than 0.";
        break;
      }
      if (state.minesInput >= state.widthInput * state.heightInput) {
        nextState.errorMessage =
          "Invalid input: mine count must be less than width times height.";
        break;
      }
      nextState.width = state.widthInput;
      nextState.height = state.heightInput;
      nextState.grid = Array<Array<MinesweeperCellType>>(state.heightInput)
        .fill([0])
        .map(() => Array<MinesweeperCellType>(state.widthInput).fill("hidden"));
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

      nextState.errorMessage = "";

      break;
    }
  }

  return nextState;
};

