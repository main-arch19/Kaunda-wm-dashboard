"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, Plug } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/dashboard/revenue", label: "Revenue Tracker", icon: BarChart2 },
  { href: "/dashboard/integrations", label: "Integrations", icon: Plug },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <aside
      className="w-56 flex flex-col pt-6 shrink-0 border-r border-white/10"
      style={{ backgroundColor: "#0A1F4E" }}
    >
      <nav className="flex flex-col gap-1 px-3">
        {links.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-150",
                "hover:bg-white/10",
                isActive
                  ? "bg-white/10 text-[#F0C646] font-semibold border-l-2 border-[#F0C646] pl-[14px]"
                  : "text-white/70"
              )}
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              <Icon
                size={18}
                className={isActive ? "text-[#F0C646]" : "text-white/50"}
              />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom tagline */}
      <div className="mt-auto px-4 pb-6">
        <p
          className="text-white/30 text-[10px] leading-relaxed italic"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          &quot;Clean Solutions.<br />Greener Future.&quot;
        </p>
      </div>
    </aside>
  );
}
