"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Plug, PanelLeftClose, PanelLeftOpen, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard/revenue", label: "Revenue Tracker", icon: BarChart2 },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
];

interface Props {
  sidebarOpen: boolean;
  mobileOpen: boolean;
  onToggleDesktop: () => void;
  onCloseMobile: () => void;
}

export default function SideNav({
  sidebarOpen,
  mobileOpen,
  onToggleDesktop,
  onCloseMobile,
}: Props) {
  const pathname = usePathname();

  return (
    <>
      {/* ── Desktop sidebar ───────────────────────────────── */}
      <aside
        className={cn(
          "hidden md:flex flex-col shrink-0 border-r border-white/10 transition-all duration-300 ease-in-out overflow-hidden",
          sidebarOpen ? "w-56" : "w-14"
        )}
        style={{ backgroundColor: "#0A1F4E" }}
      >
        {/* Toggle pin button */}
        <div className={cn("flex pt-5 pb-3 px-3", sidebarOpen ? "justify-end" : "justify-center")}>
          <button
            onClick={onToggleDesktop}
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="p-1.5 rounded-lg text-white/40 hover:text-[#F0C646] hover:bg-white/10 transition-colors"
          >
            {sidebarOpen ? <PanelLeftClose size={18} /> : <PanelLeftOpen size={18} />}
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-2">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                title={!sidebarOpen ? label : undefined}
                className={cn(
                  "flex items-center gap-3 py-3 rounded-lg text-sm transition-all duration-150",
                  sidebarOpen ? "px-4" : "px-0 justify-center",
                  "hover:bg-white/10",
                  isActive
                    ? "bg-white/10 text-[#F0C646] font-semibold border-l-2 border-[#F0C646]"
                    : "text-white/70"
                )}
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                <Icon
                  size={18}
                  className={cn("shrink-0", isActive ? "text-[#F0C646]" : "text-white/50")}
                />
                {sidebarOpen && <span className="truncate">{label}</span>}
              </Link>
            );
          })}
        </nav>

        {/* Bottom tagline — only when expanded */}
        {sidebarOpen && (
          <div className="mt-auto px-4 pb-6">
            <p
              className="text-white/30 text-[10px] leading-relaxed italic"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              &quot;Clean Solutions.<br />Greener Future.&quot;
            </p>
          </div>
        )}
      </aside>

      {/* ── Mobile slide-in drawer ────────────────────────── */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-full z-30 flex flex-col md:hidden transition-transform duration-300 ease-in-out w-64",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
        style={{ backgroundColor: "#0A1F4E" }}
      >
        {/* Header row with close button */}
        <div className="flex items-center justify-between px-4 pt-5 pb-3">
          <p
            className="text-white font-bold text-sm"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Menu
          </p>
          <button
            onClick={onCloseMobile}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 px-3">
          {links.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={onCloseMobile}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-150",
                  "hover:bg-white/10",
                  isActive
                    ? "bg-white/10 text-[#F0C646] font-semibold border-l-2 border-[#F0C646] pl-[14px]"
                    : "text-white/70"
                )}
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                <Icon size={18} className={isActive ? "text-[#F0C646]" : "text-white/50"} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto px-4 pb-8">
          <p
            className="text-white/30 text-[10px] leading-relaxed italic"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            &quot;Clean Solutions.<br />Greener Future.&quot;
          </p>
        </div>
      </aside>
    </>
  );
}
