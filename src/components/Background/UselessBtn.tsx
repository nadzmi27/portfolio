// UselessBtn.tsx
import { useState } from "react";
import data from "../../data/uselessweb.json";

const sites: string[] = data.uselessweb;

interface Props {
  className?: string;
}

export default function UselessBtn({ className }: Props) {
  const originalLabel = "Click me?"
  const [label, setLabel] = useState(originalLabel);
  let last: string | undefined;

  const handleClick = () => {
    let url: string;

    do {
      url = sites[Math.floor(Math.random() * sites.length)];
    } while (url === last && sites.length > 1);

    last = url;
    setLabel("Loading...");

    setTimeout(() => {
      setLabel("Click me again?")
      window.open(url)
    }, 300);
  };

  return (
    <button className={`${className} cursor-pointer`} onClick={handleClick}>
      {label}
    </button>
  );
}
