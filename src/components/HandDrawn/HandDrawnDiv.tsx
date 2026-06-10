import {
  useRef,
  useEffect,
  type ReactNode,
  useState,
  type MouseEventHandler,
} from "react";
import rough from "roughjs";

type RoughStyle = Record<string, any>;

function HandDrawnDiv({
  children,
  className = "",
  onClick,
  styles,
  pad = 5,
  seed
}: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  styles?: {
    default?: RoughStyle;
    hover?: RoughStyle;
    active?: RoughStyle;
  };
  pad?: number;
  seed?: number;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const seedRef = useRef(Math.random() * 100000);

  const [size, setSize] = useState({ width: 0, height: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

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

  // Pick style based on state
  const computedStyle: RoughStyle = isPressed
    ? (styles?.active ?? styles?.default ?? { stroke: "#000", roughness: 2 })
    : isHovered
      ? (styles?.hover ?? styles?.default ?? { stroke: "#000", roughness: 2 })
      : (styles?.default ?? { stroke: "#000", roughness: 2 });

  // Draw / redraw
  useEffect(() => {
    if (!svgRef.current) return;
    if (size.width === 0 || size.height === 0) return;

    const svg = svgRef.current;
    svg.innerHTML = "";

    const rc = rough.svg(svg);

    const node = rc.rectangle(
      pad,
      pad,
      size.width - pad * 2,
      size.height - pad * 2,
      {
        ...computedStyle,
        seed: computedStyle.seed ?? seed ?? seedRef.current,
      },
    );
    svg.appendChild(node);
  }, [size, computedStyle]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block p-2 cursor-${onClick ? "pointer" : "default"} ${className}`}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (!onClick) return;
        if (e.key === "Enter" || e.key === " ") {
          onClick(e as any);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
    >
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
      <div className="relative z-1">{children}</div>
    </div>
  );
}

export default HandDrawnDiv;
