import DashboardShell from "@/components/nav/DashboardShell";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashboardShell userEmail="preview@kaundawm.co.zm">
      {children}
    </DashboardShell>
  );
}
