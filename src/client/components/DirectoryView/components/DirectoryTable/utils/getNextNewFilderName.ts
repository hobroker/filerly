const baseName = "untitled folder";

export const getNextNewFilderName = (directories: string[]) => {
  let i = 2;
  let name = baseName;
  while (directories.includes(name)) {
    name = `${baseName} ${i}`;
    i++;
  }

  return name;
};
