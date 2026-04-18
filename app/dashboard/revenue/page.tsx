import KpiCards from "@/components/dashboard/KpiCards";
import ClientTable from "@/components/dashboard/ClientTable";
import RevenueBarChart from "@/components/charts/RevenueBarChart";
import InvoiceDonutChart from "@/components/charts/InvoiceDonutChart";
import {
  fetchClientRows,
  fetchMonthlyRevenue,
  fetchDonutData,
} from "@/lib/data/fetchRevenueData";
import {
  mockClientRows,
  mockMonthlyRevenue,
  mockDonutData,
} from "@/lib/data/mockData";
import type { ClientRow, MonthlyRevenue, DonutSlice } from "@/types";

export default async function RevenuePage() {
  let clientRows: ClientRow[] = mockClientRows;
  let monthlyData: MonthlyRevenue[] = mockMonthlyRevenue;
  let donutData: DonutSlice[] = mockDonutData;

  try {
    [clientRows, monthlyData, donutData] = await Promise.all([
      fetchClientRows(),
      fetchMonthlyRevenue(),
      fetchDonutData(),
    ]);
  } catch {
    // Supabase not configured — using mock data
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Page heading */}
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

      {/* KPI Cards */}
      <KpiCards rows={clientRows} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueBarChart data={monthlyData} />
        </div>
        <div>
          <InvoiceDonutChart data={donutData} />
        </div>
      </div>

      {/* Client Table */}
      <ClientTable rows={clientRows} />
    </div>
  );
}
