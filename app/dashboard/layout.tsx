import TopNav from "@/components/nav/TopNav";
import SideNav from "@/components/nav/SideNav";
import { Toaster } from "@/components/ui/sonner";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <SideNav />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav userEmail="preview@kaundawm.co.zm" />
        <main
          className="flex-1 overflow-y-auto p-6"
          style={{ backgroundColor: "#F4F6FA" }}
        >
          {children}
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
