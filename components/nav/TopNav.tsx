"use client";

import Image from "next/image";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";

interface Props {
  userEmail: string;
}

export default function TopNav({ userEmail }: Props) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <header
      className="h-16 flex items-center justify-between px-6 shrink-0 border-b border-white/10"
      style={{ backgroundColor: "#0A1F4E" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3">
        <Image
          src="/logo.png"
          alt="Kaunda Waste Management"
          width={44}
          height={44}
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
          <p className="text-[#F0C646] text-xs" style={{ fontFamily: "var(--font-open-sans)" }}>
            Revenue Tracker
          </p>
        </div>
      </div>

      {/* User info + logout */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white/10 rounded-full px-3 py-1.5">
          <User size={14} className="text-white/60" />
          <span
            className="text-white/80 text-xs hidden sm:block"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            {userEmail}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-white/70 hover:text-[#F0C646] hover:bg-white/10 rounded-full px-3"
        >
          <LogOut size={15} className="mr-1" />
          <span className="hidden sm:inline text-xs">Sign Out</span>
        </Button>
      </div>
    </header>
  );
}
