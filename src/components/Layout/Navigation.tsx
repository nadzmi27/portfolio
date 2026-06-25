import { FolderOpen } from "lucide-react";

const Navigation = ({
  segments,
  base,
}: {
  segments: string[];
  base: string;
}) => {
  const breadcrumbs = segments
    .map((segment, index) => ({
      label: segment,
      href: "/" + segments.slice(0, index + 1).join("/"),
    }))
    .slice(1);
  const ancestors = breadcrumbs.slice(0, -1);
  const current = breadcrumbs[breadcrumbs.length - 1];
  const lastAncestor = ancestors.at(-1);

  if (lastAncestor?.label === "blog") {
    current.label = `page ${current.label.trim()}`;
  }

  return (
    <div className="flex items-center z-50 min-w-0">
      <a href={base} className="flex items-center pr-1 shrink-0">
        <span className="nav-link mr-0.5">~</span>
        <span>/</span>
        <span className="flex items-center nav-link">
          <FolderOpen className="mx-1 translate-y-[1px]" size={16} />
          portfolio
        </span>
      </a>

      {ancestors.map((crumb) => (
        <span key={crumb.href} className="flex items-center shrink-0">
          <span className="mr-0.5">/</span>
          <a href={crumb.href} className="nav-link pr-1">
            {crumb.label}
          </a>
        </span>
      ))}

      {current && (
        <>
          <span className="mr-0.5 shrink-0">/</span>
          <span className="mr-0.5 text-nav-link [word-spacing:-0.25em] truncate min-w-0 max-w-48">
            {current.label}
          </span>
        </>
      )}

      <span className="shrink-0">/</span>
      <span className="relative bottom-[-1.5px] h-[16px] w-[6px] ml-1 bg-nav-link animate-terminal-fade shrink-0"></span>
    </div>
  );
};

export default Navigation;
