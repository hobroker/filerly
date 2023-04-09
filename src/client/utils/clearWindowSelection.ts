export const clearWindowSelection = () => {
  window.getSelection()?.removeAllRanges();
};
