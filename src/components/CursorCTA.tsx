import { useEffect, useRef, useState, type ReactNode } from "react";

export default function CursorCTA({
  children,
  tooltip,
}: {
  children: ReactNode;
  tooltip: String;
}) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);

  useEffect(() => {
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
  }, []);

  return (
    <div className="w-fit h-fit">
      <div
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
      >
        {children}
      </div>

      {visible && (
        <div
          style={{
            position: "fixed",
            left: pos.x + 16,
            top: pos.y + 16,
            pointerEvents: "none",
            zIndex: 9999,
          }}
        >
          <div
            className="bg-red-500 text-white px-2.5 pt-2 pb-2.5 text-base max-w-64 whitespace-pre-line leading-tight"
          >
            {tooltip}
          </div>
        </div>
      )}
    </div>
  );
}
