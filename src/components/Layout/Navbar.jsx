import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const base = "/portfolio";
const navLinks = [
  { title: "Home", href: "" },
  { title: "About me", href: "/about" },
  { title: "Projects", href: "/project" },
  { title: "Blog", href: "/blog" },
  { title: "Visitor Corner", href: "/visitor" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const menuVars = {
    initial: {
      scaleY: 0,
    },
    animate: {
      scaleY: 1,
      transition: {
        duration: 0.5,
        ease: [0.12, 0, 0.39, 0],
      },
    },
    exit: {
      scaleY: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const containerVars = {
    initial: {
      transition: {
        staggerChildren: 0.09,
        staggerDirection: -1,
      },
    },
    open: {
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <div>
      {/* <div
        className="relative flex justify-center items-center z-50 cursor-pointer text-black border p-1.5"
        onClick={toggleMenu}
      >
        {!open ? <Menu size={16} /> : <X size={16} />}
      </div> */}
      <MenuToX open={open} toggleMenu={toggleMenu} />
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed left-0 top-0 w-full h-[120vh] pb-[10vh] origin-top bg-yellow-50 text-black z-40"
          >
            <div className="flex h-full flex-col">
              <motion.div
                variants={containerVars}
                initial="initial"
                animate="open"
                exit="initial"
                className="flex flex-col h-full justify-center font-mono items-center gap-4 -translate-y-8"
              >
                {navLinks.map((link, index) => {
                  return (
                    <div key={index}  className="overflow-hidden">
                      <MobileNavLink
                        key={`nav-${index}`}
                        title={link.title}
                        href={link.href}
                      />
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Navbar;
const mobileLinkVars = {
  initial: {
    y: "30vh",
    transition: {
      duration: 0.5,
      ease: [0.37, 0, 0.63, 1],
    },
  },
  open: {
    y: 0,
    transition: {
      ease: [0, 0.55, 0.45, 1],
      duration: 0.7,
    },
  },
};

const MobileNavLink = ({ title, href }) => {
  return (
    <motion.div
      variants={mobileLinkVars}
      className="text-4xl uppercase text-black"
    >
      <a href={base + href}>{title}</a>
    </motion.div>
  );
};

const MenuToX = ({ open, toggleMenu, size = 18 }) => {
  return (
    <div
      className="relative z-50 p-1.5 border cursor-pointer"
      onClick={toggleMenu}
    >
      <div
        className="cursor-pointer text-black flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <motion.span
          animate={open ? "open" : "closed"}
          style={{ width: size }}
          className="flex flex-col gap-[5px]"
        >
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: 45, y: 7 },
            }}
            transition={{ duration: 0.3 }}
            className="block h-[2px] w-full bg-black origin-center"
          />
          <motion.span
            variants={{
              closed: { opacity: 1, scaleX: 1 },
              open: { opacity: 0, scaleX: 0 },
            }}
            transition={{ duration: 0.3 }}
            className="block h-[2px] w-full bg-black origin-center"
          />
          <motion.span
            variants={{
              closed: { rotate: 0, y: 0 },
              open: { rotate: -45, y: -7 },
            }}
            transition={{ duration: 0.3 }}
            className="block h-[2px] w-full bg-black origin-center"
          />
        </motion.span>
      </div>
    </div>
  );
};
