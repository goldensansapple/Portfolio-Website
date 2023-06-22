export interface MinesweeperState {
  width: number;
  height: number;
  grid: Array<Array<MinesweeperCellType>>;
  trueGrid: Array<Array<MinesweeperCellType>>;
  mines: number;
  flags: number;
  minesFlagged: number;
  hidden: number;
  mode: MinesweeperMode;
  gameState: MinesweeperGameState;

  widthInput: number;
  heightInput: number;
  minesInput: number;
  errorMessage: string;
}

export type MinesweeperCellType = "hidden" | "flag" | "mine" | "exploded" | number;

export type MinesweeperGameState = "playing" | "win" | "lose" | "setup";

export type MinesweeperMode = "reveal" | "flag";

export type MinesweeperAction =
  | { type: "CLICK"; coord: { x: number; y: number } }
  | { type: "CHANGE_MODE" }
  | { type: "CHANGE_WIDTH"; width: number }
  | { type: "CHANGE_HEIGHT"; height: number }
  | { type: "CHANGE_MINES"; mines: number }
  | { type: "RESET" };
