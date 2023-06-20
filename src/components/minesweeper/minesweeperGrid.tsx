
import MinesweeperCell from "./minesweeperCell";
import { MinesweeperCellType } from "./types";

export default function MinesweeperGrid({
  grid,
  handleClick,
}: {
  grid: MinesweeperCellType[][];
  handleClick: (x: number, y: number) => void;
}) {
  return (
    <table className="table-fixed whitespace-nowrap w-max">
      <tbody>
        {grid.map((row, y) => (
          <tr key={y}>
            {row.map((cell, x) => (
              <td key={x}>
                <MinesweeperCell
                  cell={cell}
                  onClick={() => handleClick(x, y)}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
