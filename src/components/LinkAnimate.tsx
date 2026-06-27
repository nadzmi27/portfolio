import { type ReactNode } from "react";

const LinkAnimate = ({
  href,
  underline = false,
  children,
}: {
  href: string;
  underline: boolean;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${underline ? "underline" : "no-underline hover-underline-animation"} text-nav-link hover:text-black`}
  >
    {children}
  </a>
);

export default LinkAnimate;
