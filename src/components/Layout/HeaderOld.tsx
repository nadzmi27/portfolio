import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./Navigation.tsx";
import CursorCTA from "../Tooltip.tsx";

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
          fixed top-0 left-0 right-0 z-50
          flex justify-center w-full h-[80px]
          pt-4 px-4 pb-4
          bg-white/10 backdrop-blur-lg
        "
      >
        <nav
          className="
            flex justify-between items-center
            w-full max-w-[1040px]
            text-base
          "
        >
          {/* Left side */}
          <Navigation segments={segments} base={base} />

          {/* Desktop nav */}
          <div className="hidden md:flex md:items-center gap-4">
            {links.slice(0, -1).map((link) => (
              <a
                key={link.href}
                href={`${base}${link.href}`}
                className="nav-link cursor-default px-2 py-1.25 hover-underline-animation"
              >
                {link.label}
              </a>
            ))}
            <CursorCTA tooltip={links.at(-1)!.tooltip}>
              <a
                key={links.at(-1)!.href}
                href={`${base}${links.at(-1)!.href}`}
                className="nav-link cursor-default px-2 ml-2 py-1.25 border"
              >
                {links.at(-1)!.label}
              </a>
            </CursorCTA>
          </div>

          {/* Mobile button */}
          {!open && (
            <button className="md:hidden text-xl" onClick={() => setOpen(true)}>
              ☰
            </button>
          )}
        </nav>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              className="
                fixed top-0 right-0 z-50
                h-full w-[280px]
                bg-sidebar/50
                flex flex-col gap-4
                border-l
                shadow-xl
                backdrop-blur-2xl
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
              }}
            >
              <div className="border-b-1 w-full p-4 text-base">
                <span className="flex justify-between items-center">
                  <p className="font-bold">Navigation</p>
                  <button
                    className="self-end font-semibold"
                    onClick={() => setOpen(false)}
                  >
                    ✕
                  </button>
                </span>
              </div>

              <div className="flex flex-col gap-2 mx-4 pb-2 border-b">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={`/portfolio${link.href}`}
                    className="nav-link pl-2 py-2 text-base rounded-md hover:bg-black/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
