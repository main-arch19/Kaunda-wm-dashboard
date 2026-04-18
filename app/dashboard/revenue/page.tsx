import KpiCards from "@/components/dashboard/KpiCards";
import ClientTable from "@/components/dashboard/ClientTable";
import RevenueBarChart from "@/components/charts/RevenueBarChart";
import InvoiceDonutChart from "@/components/charts/InvoiceDonutChart";
import { mockClientRows, mockMonthlyRevenue, mockDonutData } from "@/lib/data/mockData";

export default function RevenuePage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
        >
          Revenue Tracker
        </h1>
        <p
          className="text-sm text-gray-400 mt-1"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Track invoices, payments, and outstanding balances across all clients.
        </p>
      </div>

      <KpiCards rows={mockClientRows} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueBarChart data={mockMonthlyRevenue} />
        </div>
        <div>
          <InvoiceDonutChart data={mockDonutData} />
        </div>
      </div>

      <ClientTable rows={mockClientRows} />
    </div>
  );
}
