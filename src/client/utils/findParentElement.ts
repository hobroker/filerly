export const findParentElement = <T extends HTMLElement>(
  tagName: string,
  element: HTMLElement
): T | null => {
  if (element.tagName.toLowerCase() === tagName) {
    return element as T;
  }
  if (element.parentElement) {
    return findParentElement<T>(tagName, element.parentElement);
  }

  return null;
};
