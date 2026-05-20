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
  const current = breadcrumbs[breadcrumbs.length - 1];
  const ancestors = breadcrumbs.slice(0, -1);
  return (
    <div className="flex items-center text-">
      <a href={base} className="flex items-center">
        <span className="nav-link">~</span>
        <span className="ml-2">/</span>

        <span className="flex items-center nav-link">
          <FolderOpen className="ml-2 mr-1" size={18} />
          portfolio
        </span>
      </a>
      <span className="ml-1"></span>

      {ancestors.map((crumb) => {
        const href = crumb.href;
        return (
          <>
            {"/"}
            <a href={href} className="hover:tesxt-amber-300 mx-1">
              {crumb.label}
            </a>
          </>
        );
      })}

      {/* current (NOT clickable) */}
      {current && (
        <>
          <span className="mr-1">/</span>
          <span className="text-nav-link">{current.label}</span>
        </>
      )}

      <span className="ml-1">/</span>
      <span className="relative bottom-[-1.5px] h-[16px] w-[6px] ml-1 bg-nav-link animate-[terminal-fade_3s_ease-in-out_infinite]"></span>
    </div>
  );
};

export default Navigation;
