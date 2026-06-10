import {
  useRef,
  useEffect,
  type ReactNode,
  useState,
  type MouseEventHandler,
} from "react";
import rough from "roughjs";

type RoughStyle = Record<string, any>;

function HandDrawnLine({
  className = "",
  coordinates,
  styles,
  pad = 5,
  seed,
}: {
  className?: string;
  coordinates?: [number, number, number, number];
  onClick?: MouseEventHandler<HTMLDivElement>;
  styles?: RoughStyle;
  pad?: number;
  seed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const seedRef = useRef(Math.random() * 100000);

  const [size, setSize] = useState({ width: 0, height: 0 });

  // Obersve the size change
  useEffect(() => {
    if (!containerRef.current) return;
    const el = containerRef.current;

    const observer = new ResizeObserver(() => {
      const rect = el.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    });

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  // Draw / redraw
  useEffect(() => {
    if (!svgRef.current) return;
    if (size.width === 0) return;

    const svg = svgRef.current;
    svg.innerHTML = "";

    const rc = rough.svg(svg);

    const options = {
      ...styles,
      seed: seed ?? seedRef.current,
    };

    const y = size.height / 2;
    const node = coordinates
      ? (() => {
          const [x1, y1, x2, y2] = coordinates;
          return rc.line(x1, y1, x2, y2, options);
        })()
      : rc.line(pad, y, size.width - pad, y, options);

    svg.appendChild(node);
  }, [size, coordinates, styles, seed]);

  return (
    <div ref={containerRef} className={`relative h-4 ${className}`}>
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}

export default HandDrawnLine;
