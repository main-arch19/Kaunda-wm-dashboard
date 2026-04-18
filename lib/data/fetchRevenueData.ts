import { createClient } from "@/lib/supabase/server";
import type { ClientRow, MonthlyRevenue, DonutSlice } from "@/types";

export async function fetchClientRows(): Promise<ClientRow[]> {
  const supabase = await createClient();

  const { data: invoices, error } = await supabase
    .from("invoices")
    .select(
      `id, client_id, total_due, due_date, status,
       clients ( company_name ),
       payments ( amount_paid, date_paid )`
    )
    .order("due_date", { ascending: false });

  if (error) throw new Error(error.message);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (invoices ?? []).map((inv: any) => {
    const payments: { amount_paid: number; date_paid: string }[] =
      inv.payments ?? [];
    const totalPaid = payments.reduce((sum, p) => sum + p.amount_paid, 0);
    const sortedPayments = [...payments].sort(
      (a, b) =>
        new Date(b.date_paid).getTime() - new Date(a.date_paid).getTime()
    );

    return {
      client_id: inv.client_id,
      company_name: inv.clients?.company_name ?? "Unknown",
      invoice_id: inv.id,
      total_due: inv.total_due,
      due_date: inv.due_date,
      status: inv.status as "paid" | "partial" | "unpaid",
      amount_paid: totalPaid,
      remaining_balance: inv.total_due - totalPaid,
      last_payment_date: sortedPayments[0]?.date_paid ?? null,
    };
  });
}

export async function fetchMonthlyRevenue(): Promise<MonthlyRevenue[]> {
  const rows = await fetchClientRows();

  const now = new Date();
  const months: MonthlyRevenue[] = [];

  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
    const label = d.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });

    const collected = rows
      .filter(
        (r) => r.last_payment_date && r.last_payment_date.startsWith(key)
      )
      .reduce((s, r) => s + r.amount_paid, 0);

    const outstanding = rows
      .filter((r) => r.due_date.startsWith(key) && r.remaining_balance > 0)
      .reduce((s, r) => s + r.remaining_balance, 0);

    months.push({ month: label, collected, outstanding });
  }

  return months;
}

export async function fetchDonutData(): Promise<DonutSlice[]> {
  const rows = await fetchClientRows();
  const counts = { paid: 0, partial: 0, unpaid: 0 };
  rows.forEach((r) => {
    counts[r.status]++;
  });
  return [
    { name: "Paid in Full", value: counts.paid, color: "#22c55e" },
    { name: "Partial", value: counts.partial, color: "#F0C646" },
    { name: "Unpaid", value: counts.unpaid, color: "#ef4444" },
  ];
}
