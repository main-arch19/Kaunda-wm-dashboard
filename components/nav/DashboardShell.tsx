"use client";

import { useState, useEffect } from "react";
import SideNav from "./SideNav";
import TopNav from "./TopNav";
import { Toaster } from "@/components/ui/sonner";

export default function DashboardShell({
  children,
  userEmail,
}: {
  children: React.ReactNode;
  userEmail: string;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);   // desktop expand/collapse
  const [mobileOpen, setMobileOpen] = useState(false);    // mobile slide-in

  // Close mobile drawer on route change / resize to desktop
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 768) setMobileOpen(false);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <SideNav
        sidebarOpen={sidebarOpen}
        mobileOpen={mobileOpen}
        onToggleDesktop={() => setSidebarOpen((p) => !p)}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <TopNav
          userEmail={userEmail}
          onMobileMenuToggle={() => setMobileOpen((p) => !p)}
        />
        <main
          className="flex-1 overflow-y-auto p-4 md:p-6"
          style={{ backgroundColor: "#F4F6FA" }}
        >
          {children}
        </main>
      </div>

      <Toaster position="top-right" richColors />
    </div>
  );
}
