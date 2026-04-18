"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogOut, User, Menu } from "lucide-react";

interface Props {
  userEmail: string;
  onMobileMenuToggle: () => void;
}

export default function TopNav({ userEmail, onMobileMenuToggle }: Props) {
  return (
    <header
      className="h-14 md:h-16 flex items-center justify-between px-4 md:px-6 shrink-0 border-b border-white/10"
      style={{ backgroundColor: "#0A1F4E" }}
    >
      {/* Left: mobile hamburger + logo */}
      <div className="flex items-center gap-3">
        {/* Hamburger — mobile only */}
        <button
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        <Image
          src="/logo.png"
          alt="Kaunda Waste Management"
          width={36}
          height={36}
          priority
          className="object-contain"
        />
        <div className="hidden sm:block">
          <p
            className="text-white font-bold text-sm leading-tight"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Kaunda WM
          </p>
          <p className="text-[#F0C646] text-[10px]" style={{ fontFamily: "var(--font-open-sans)" }}>
            Revenue Tracker
          </p>
        </div>
      </div>

      {/* Right: user pill + sign out */}
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
          <User size={13} className="text-white/60 shrink-0" />
          <span
            className="text-white/80 text-xs hidden sm:block max-w-[140px] truncate"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            {userEmail}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {}}
          className="text-white/70 hover:text-[#F0C646] hover:bg-white/10 rounded-full px-2 md:px-3"
        >
          <LogOut size={15} />
          <span className="hidden md:inline text-xs ml-1">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
