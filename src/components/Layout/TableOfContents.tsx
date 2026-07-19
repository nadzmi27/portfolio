import { useEffect, useState } from "react";

interface Heading {
  depth: number;
  slug: string;
  text: string;
}

interface Props {
  headings: Heading[];
}

export default function TableOfContents({ headings }: Props) {
  const [activeId, setActiveId] = useState<string>("");
  const indentMap: Record<number, string> = {
    1: "0",
    2: "0.875rem",
    3: "1.75rem",
  };
  // Filter to only h1, h2, h3
  const filtered = headings.filter((h) => h.depth <= 3);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            break;
          }
        }
      },
      {
        rootMargin: "-80px 0px -60% 0px", // triggers near the top of viewport
        threshold: 0,
      },
    );

    filtered.forEach(({ slug }) => {
      const el = document.getElementById(slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [filtered]);

  if (filtered.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="sticky max-h-[calc(100vh-6rem)] pb-10 md:pb-20 overflow-y-auto no-scrollbar"
    >
      <ul className="space-y-1">
        {filtered.map((heading) => (
          <li
            key={heading.slug}
            style={{ paddingLeft: indentMap[heading.depth] ?? "0" }}
          >
            <a
              href={`#${heading.slug}`}
              className={[
                "block py-0.5 transition-colors hover:text-black",
                activeId === heading.slug
                  ? "text-black font-medium"
                  : "text-black/60",
              ].join(" ")}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(heading.slug);
                if (!el) return;
                const elTop = el.getBoundingClientRect().top + window.scrollY;
                const isScrollingUp = elTop < window.scrollY;
                const offset = isScrollingUp ? 80 : 24;
                window.scrollTo({ top: elTop - offset, behavior: "smooth" });
                window.history.pushState(null, "", `#${heading.slug}`);
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
