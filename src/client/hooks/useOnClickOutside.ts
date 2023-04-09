import { type RefObject, useCallback, useEffect } from "react";

export function useOnClickOutside<
  ElementType extends HTMLElement = HTMLDivElement
>(ref: RefObject<ElementType>, onClickOutside: (node: Node) => void) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClickOutside(target);
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
