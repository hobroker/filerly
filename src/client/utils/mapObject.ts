export const mapObject = <T, U = T>(
  fn: (value: T, key: string) => U,
  obj: { [key: string]: T }
): { [key: string]: U } => {
  const result: { [key: string]: U } = {};
  Object.entries(obj).forEach(([key, value]) => {
    result[key] = fn(value, key);
  });

  return result;
};
