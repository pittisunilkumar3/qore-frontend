import { RefObject, useEffect, useRef } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export function useMousePositionRef(
  containerRef: RefObject<HTMLElement>
): React.MutableRefObject<MousePosition> {
  const positionRef = useRef<MousePosition>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      positionRef.current = {
        x: event.clientX - (rect.left + rect.width / 2),
        y: event.clientY - (rect.top + rect.height / 2),
      };
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  return positionRef;
}
