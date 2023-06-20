import { MinesweeperCellType, MinesweeperState } from "./types";
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
 * @param state The game state.
 * @param initalX The x coordinate of the cell.
 * @param initalY The y coordinate of the cell.
 */
export function revealEmpties(
  grid: MinesweeperCellType[][],
  trueGrid: MinesweeperCellType[][],
  width: number,
  height: number,
  initalX: number,
  initalY: number
) {
  const queue = [{ x: initalX, y: initalY }];
  let hiddenRemoved = 0;
  while (queue.length > 0) {
    const { x, y } = queue.pop()!!;
    grid[y][x] = trueGrid[y][x];
    hiddenRemoved++;
    if (trueGrid[y][x] === 0) {
      for (const [dx, dy] of surrounding8) {
        const nx = x + dx;
        const ny = y + dy;
        if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
        if (
          grid[ny][nx] === "hidden" &&
          queue.find((c) => c.x === nx && c.y === ny) === undefined
        ) {
          queue.push({ x: nx, y: ny });
        }
      }
    }
  }
  return { grid, hiddenRemoved };
}

export function isValidDimension(value: number): boolean {
  return value >= 1 && value <= 50;
}
