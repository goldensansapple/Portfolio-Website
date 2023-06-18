const {
  newMinesweeperGrid,
  revealEmpties,
} = require("../components/minesweeper/controller.ts");

test("Generate a new board", () => {
  const board = newMinesweeperGrid(10, 10, 10);

  let mineCount = 0;

  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      switch (board[y][x]) {
        case "mine": {
          expect(board[y][x]).toBe("mine");
          mineCount++;
          break;
        }

        default: {
          expect(board[y][x]).toBeGreaterThanOrEqual(0);
          expect(board[y][x]).toBeLessThanOrEqual(8);
        }
      }
    }
  }
  expect(mineCount).toBe(10);
});

test("Reveal a lake of zeros in the grid", () => {
  const trueGrid = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, "mine", 1],
    [0, 1, 1, 1],
    [0, 0, 0, 0]
  ];

  const grid = [
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"]
  ];

  const expectedGrid = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 1, "hidden", "hidden"],
    [0, 1, 1, 1],
    [0, 0, 0,0 ]
  ];

  const state = { grid, trueGrid, hidden: 20, width: 4, height: 5 };

  revealEmpties(state, 1, 0);

  expect(grid).toEqual(expectedGrid);
  expect(state.hidden).toBe(2);
});
