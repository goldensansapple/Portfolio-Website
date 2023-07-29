/**
 * Convert a 1D array to a 2D array with given width.
 *
 * @param array Input array.
 * @param width New width for 2D array.
 * @returns 2D array.
 */
export function convertTo2DArray<T>(array: T[], width: number): T[][] {
  const result = [];

  for (var i = 0; i < array.length; i += width) {
    result.push(array.slice(i, i + width));
  }

  return result;
}

/**
 * Shuffles an array in-place.
 *
 * @param array The array to shuffle.
 */
export function shuffle<T>(array: T[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
