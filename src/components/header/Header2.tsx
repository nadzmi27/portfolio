import { useState } from "react";
import Navigation from "./Navigation.tsx";
import Tooltip from "../Tooltip.tsx";
import Navbar from "./Navbar.jsx";

const links = [
  { href: "/about", label: "About", tooltip: "Learn more about me :)" },
  { href: "/project", label: "Projects", tooltip: "Check out my works!" },
  { href: "/blog", label: "Blog", tooltip: "Read what I've written!" },
  {
    href: "/visitor",
    label: "Visitor Corner",
    tooltip: "Under construction :(",
  },
];

export default function Header({
  segments,
  base,
}: {
  segments: string[];
  base: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header
        className="
          fixed top-0 left-0 right-0 z-9999
          flex justify-center w-full h-[80px]
          pt-4 px-4 pb-4
          font-mono
        "
      >
        {/* Blur layer */}
        <div
          className="
    absolute inset-0 backdrop-blur-xl bg-white/20
    [mask-image:linear-gradient(to_bottom,white,rgba(0,0,0,0.8))]
  "
        />

        <nav
          className="
            relative z-10
            flex justify-between items-center
            w-full max-w-[1048px]
            text-lg
          "
        >
          {/* Left side */}
          <Navigation segments={segments} base={base} />

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center gap-4">
            {links.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={`/portfolio${link.href}`}
                className="nav-link px-2 py-1.25 hover-underline-animation"
              >
                {link.label}
              </a>
            ))}
            <Tooltip tooltip={links.at(-1)!.tooltip}>
              <p
                key={links.at(-1)!.href}
                // href={`/portfolio${links.at(-1)!.href}`}
                className="nav-link cursor-default px-2 ml-2 py-1.25 border select-none"
              >
                {links.at(-1)!.label}
              </p>
            </Tooltip>
          </div>

          {/* Mobile button */}
          <div className="md:hidden pr-1">
            <Navbar />
          </div>
        </nav>
      </header>
    </>
  );
}
