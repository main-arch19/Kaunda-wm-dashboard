import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { ClientRow } from "@/types";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";

interface Props {
  rows: ClientRow[];
}

export default function KpiCards({ rows }: Props) {
  const now = new Date();
  const thisMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

  const totalOutstanding = rows.reduce((s, r) => s + r.remaining_balance, 0);

  const collectedThisMonth = rows
    .filter((r) => r.last_payment_date?.startsWith(thisMonthKey))
    .reduce((s, r) => s + r.amount_paid, 0);

  const overdue = rows
    .filter((r) => r.status !== "paid" && new Date(r.due_date) < now)
    .reduce((s, r) => s + r.remaining_balance, 0);

  const cards = [
    {
      label: "Total Outstanding",
      value: formatCurrency(totalOutstanding),
      icon: Clock,
      iconBg: "#FEF9C3",
      iconColor: "#854d0e",
      valueColor: "#D4A82E",
    },
    {
      label: "Collected This Month",
      value: formatCurrency(collectedThisMonth),
      icon: CheckCircle,
      iconBg: "#DCFCE7",
      iconColor: "#16a34a",
      valueColor: "#16a34a",
    },
    {
      label: "Overdue",
      value: formatCurrency(overdue),
      icon: AlertCircle,
      iconBg: "#FEE2E2",
      iconColor: "#dc2626",
      valueColor: "#dc2626",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map(({ label, value, icon: Icon, iconBg, iconColor, valueColor }) => (
        <Card
          key={label}
          className="border-0"
          style={{
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(10,31,78,0.08)",
          }}
        >
          <CardContent className="p-6 flex items-center gap-4">
            <div
              className="p-3 rounded-xl shrink-0"
              style={{ backgroundColor: iconBg }}
            >
              <Icon size={24} style={{ color: iconColor }} />
            </div>
            <div>
              <p
                className="text-sm text-gray-500"
                style={{ fontFamily: "var(--font-open-sans)" }}
              >
                {label}
              </p>
              <p
                className="text-2xl font-bold mt-0.5"
                style={{
                  fontFamily: "var(--font-montserrat)",
                  color: valueColor,
                }}
              >
                {value}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
