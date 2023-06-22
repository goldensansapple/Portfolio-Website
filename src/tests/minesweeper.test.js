const {
  newMinesweeperGrid,
  isValidDimension,
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
    [0, 2, "mine", 2],
    [0, 2, "mine", 2],
    [0, 1, 1, 1],
  ];

  const startGrid = [
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
    ["hidden", "hidden", "hidden", "hidden"],
  ];

  const expectedGrid = [
    [0, 0, 0, 0],
    [0, 1, 1, 1],
    [0, 2, "hidden", "hidden"],
    [0, 2, "hidden", "hidden"],
    [0, 1, "hidden", "hidden"],
  ];

  const { newGrid, hiddenRemoved } = revealEmpties(
    startGrid,
    trueGrid,
    4,
    5,
    1,
    0
  );

  expect(newGrid).toEqual(expectedGrid);
  expect(hiddenRemoved).toBe(14);
});

test("Valid dimension function test", () => {
  expect(isValidDimension(10, 10, 10)).toBe(true);
  expect(isValidDimension(-10, 10, 10)).toBe(false);
  expect(isValidDimension(10, -10, 10)).toBe(false);
  expect(isValidDimension(10, 10, -10)).toBe(false);
  expect(isValidDimension(0, 10, 10)).toBe(false);
  expect(isValidDimension(10, 0, 10)).toBe(false);
  expect(isValidDimension(10, 10, 0)).toBe(false);
  expect(isValidDimension(NaN, 10, 10)).toBe(false);
  expect(isValidDimension(10, NaN, 10)).toBe(false);
  expect(isValidDimension(10, 10, NaN)).toBe(false);
});
