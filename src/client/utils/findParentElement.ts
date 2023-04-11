export const findParentElement = <T extends HTMLElement>(
  tagName: string,
  element: HTMLElement | null
): T | null => {
  if (!element) {
    return null;
  }
  if (element.tagName.toLowerCase() === tagName) {
    return element as T;
  }

  return findParentElement<T>(tagName, element.parentElement);
};
