"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { DonutSlice } from "@/types";

interface Props {
  data: DonutSlice[];
}

export default function InvoiceDonutChart({ data }: Props) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div
      className="bg-white p-4 md:p-6 h-full"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(10,31,78,0.08)",
      }}
    >
      <h2
        className="text-lg font-bold mb-1"
        style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
      >
        Invoice Status
      </h2>
      <p
        className="text-xs text-gray-400 mb-3"
        style={{ fontFamily: "var(--font-open-sans)" }}
      >
        {total} invoices total
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="42%"
            innerRadius={55}
            outerRadius={85}
            paddingAngle={3}
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [
              `${value} invoices`,
              name,
            ]}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 20px rgba(10,31,78,0.12)",
              fontFamily: "var(--font-open-sans)",
              fontSize: "12px",
            }}
          />
          <Legend
            wrapperStyle={{
              fontFamily: "var(--font-open-sans)",
              fontSize: "12px",
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
