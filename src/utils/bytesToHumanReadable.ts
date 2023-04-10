export const bytesToHumanReadable = (bytes: number, decimals = 2) => {
  if (bytes == 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const idx = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, idx)).toFixed(decimals))} ${
    sizes[idx] || "B"
  }`;
};
