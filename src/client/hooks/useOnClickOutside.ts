import { type RefObject, useCallback, useEffect } from "react";

export function useOnClickOutside<
  ElementType extends HTMLElement = HTMLDivElement
>(ref: RefObject<ElementType>, onClickOutside: (node: Node) => void) {
  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Node;
      console.log("target", target);
      if (
        ref.current &&
        !ref.current.contains(target) &&
        !document
          .querySelector("[data-radix-popper-content-wrapper]")
          ?.contains(target)
      ) {
        setTimeout(() => onClickOutside(target), 0);
      }
    },
    [onClickOutside, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
    };
  }, [handleClickOutside]);
}
