export function convertTo2DArray<T>(array: T[], width: number): T[][] {
  const result = [];

  for (var i = 0; i < array.length; i += width) {
    result.push(array.slice(i, i + width));
  }

  return result;
}

/**
 * Shuffles an array.
 *
 * @param array The array to shuffle.
 */
export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
