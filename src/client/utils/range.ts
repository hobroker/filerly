export const range = (start: number | string, end: number | string) => {
  const list = [];
  const min = Math.min(Number(start), Number(end));
  const max = Math.max(Number(start), Number(end));
  for (let i = min; i <= max; i++) {
    list.push(i);
  }

  return list;
};
