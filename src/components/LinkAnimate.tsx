import { type ReactNode } from "react";

const LinkAnimate = ({
  href,
  underline = false,
  className = "",
  children,
}: {
  href: string;
  underline?: boolean;
  className?: string;
  children: ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${underline ? "underline" : "no-underline hover-underline-animation"} text-nav-link hover:text-black ${className}`}
  >
    {children}
  </a>
);

export default LinkAnimate;
