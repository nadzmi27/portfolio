import { useEffect, useState, type ReactNode } from "react";

export default function CursorCTA({ children }: { children: ReactNode }) {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      setPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <>
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
            style={{
              background: "red",
              color: "white",
              padding: "10px 14px",
              fontSize: "14px",
              fontWeight: 500,
              borderRadius: "2px", // sharp like your image
              whiteSpace: "nowrap",
            }}
          >
            Read case study
          </div>
        </div>
      )}
    </>
  );
}
