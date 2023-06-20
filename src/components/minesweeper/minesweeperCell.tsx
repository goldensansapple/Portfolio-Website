import Image from "next/image";
import { MinesweeperCellType } from "./types";

const cellWidth = 32;
const cellHeight = 32;

export default function MinesweeperCell({
  cell,
  onClick,
}: {
  cell: MinesweeperCellType;
  onClick: () => void;
}) {
  let image = null;
  switch (cell) {
    case "hidden": {
      image = (
        <Image
          src="/hidden.svg"
          alt="hidden"
          width={cellWidth}
          height={cellHeight}
          priority
        />
      );

      break;
    }
    case "flag": {
      image = (
        <Image
          src="/flag.svg"
          alt="flagged"
          width={cellWidth}
          height={cellHeight}
          priority
        />
      );

      break;
    }
    case "mine": {
      image = (
        <Image
          src="/mine.svg"
          alt="mine"
          width={cellWidth}
          height={cellHeight}
          priority
        />
      );

      break;
    }
    default: {
      image = (
        <Image
          src={`/${cell}.svg`}
          alt={`${cell}`}
          width={cellWidth}
          height={cellHeight}
          priority
        />
      );
    }
  }

  return (
    <button
      className={`p-0 w-[${cellWidth}px] h-[${cellHeight}px] min-w-[16px] min-h-[16px] border border-gray-500 dark:border-gray-400 hover:border-orange-500`}
      onClick={onClick}
    >
      {image}
    </button>
  );
}
