import { useEffect, useRef, useCallback } from "react";

export function useOnClickOutside<
  ElementType extends HTMLElement = HTMLDivElement
>(onClickOutside: (node: Node) => void) {
  const ref = useRef<ElementType>(null);

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      if (ref.current && !ref.current.contains(target)) {
        onClickOutside(target);
      }
    },
    [onClickOutside]
  );

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return { ref };
}
