export const minMaxBy = <T>(
  selector: (item: T) => number,
  array: T[]
): [number, number] => {
  const numbers = array.map(selector);

  return [Math.min(...numbers), Math.max(...numbers)];
};
