import { useEffect, useRef, useState, type ReactNode } from "react";
const canHover = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(hover: hover) and (pointer: fine)").matches;

export default function CursorCTA({
  children,
  tooltip,
  className,
}: {
  children: ReactNode;
  tooltip: String;
  className?: string;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [hoverable, setHoverable] = useState(false);

  useEffect(() => {
    setHoverable(canHover());
  }, []);

  useEffect(() => {
    if (!hoverable) return;

    const move = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener("mousemove", move);

    const animate = () => {
      setPos((prev) => ({
        x: prev.x + (target.current.x - prev.x) * 0.15,
        y: prev.y + (target.current.y - prev.y) * 0.15,
      }));
      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("mousemove", move);
  }, [hoverable]);

  const tooltipWidth = tooltipRef.current?.offsetWidth ?? 0;
  const proximity =
    typeof window !== "undefined"
      ? Math.min(
          1,
          Math.max(
            0,
            (pos.x - (window.innerWidth - tooltipWidth - 100)) / tooltipWidth,
          ),
        )
      : 0;
  const xOffset = 16 - proximity * (tooltipWidth + 32);

  return tooltip ? (
    <div
      className={`w-fit h-fit ${className ?? ""} ${visible ? "z-9999" : ""}`}
    >
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {visible && (
        <div
          ref={tooltipRef}
          style={{
            position: "fixed",
            left: pos.x,
            top: pos.y + 16,
            transform: `translateX(${xOffset}px)`,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <div className="bg-red-500 text-white px-2.5 pt-2 pb-2.5 text-base max-w-64 whitespace-pre-line leading-tight hidden lg:block">
            {tooltip}
          </div>
        </div>
      )}
    </div>
  ) : (
    <div>{children}</div>
  );
}
