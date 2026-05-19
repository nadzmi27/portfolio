import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Navigation from "./Navigation.tsx";

const links = [
  { href: "/about", label: "About Me" },
  { href: "/project", label: "Project" },
  { href: "/blog", label: "Blog" },
  { href: "/visitor", label: "Visitor Corner" },
];

export default function HeaderClient({
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
          flex justify-center w-full
          pt-4 px-4 pb-4
          bg-white/10 backdrop-blur-lg
        "
      >
        <nav
          className="
            flex justify-between items-center
            w-full max-w-[1040px]
            text-[18px]
          "
        >
          {/* Left side */}
          <Navigation segments={segments} base={base} />

          {/* Desktop nav */}
          <div className="hidden md:flex gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={`/portfolio${link.href}`}
                className="nav-link"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile button */}
          <button className="md:hidden text-xl" onClick={() => setOpen(true)}>
            ☰
          </button>
        </nav>
      </header>

      {/* Mobile sidebar */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-40 backdrop-blur-xs bg-black/10"
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
                bg-amber-50
                flex flex-col gap-4
                border-l
                shadow-xl
              "
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 24,
              }}
            >
              <div className="border-b-1 w-full p-4 text-[18px]">
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
                    className="nav-link pl-2 py-2 text-[18px] rounded-md hover:bg-black/10"
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
