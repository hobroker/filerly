import { type RefObject, useCallback, useEffect } from "react";

export function useOnClickOutside<
  ElementType extends HTMLElement = HTMLDivElement
>(ref: RefObject<ElementType>, onClickOutside: (node: Node) => void) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        setTimeout(() => onClickOutside(target), 0);
      }
    },
    [onClickOutside, ref]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);
}
