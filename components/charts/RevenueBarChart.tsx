"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyRevenue } from "@/types";

interface Props {
  data: MonthlyRevenue[];
}

function formatK(value: number) {
  if (value >= 1000) return `ZMW ${(value / 1000).toFixed(0)}k`;
  return `ZMW ${value}`;
}

export default function RevenueBarChart({ data }: Props) {
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
        Revenue Collected vs. Outstanding Debt
      </h2>
      <p
        className="text-xs text-gray-400 mb-5"
        style={{ fontFamily: "var(--font-open-sans)" }}
      >
        Last 6 months · ZMW
      </p>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "var(--font-open-sans)" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tickFormatter={formatK}
            tick={{ fontSize: 11, fill: "#6b7280", fontFamily: "var(--font-open-sans)" }}
            axisLine={false}
            tickLine={false}
            width={75}
          />
          <Tooltip
            formatter={(value, name) => [
              `ZMW ${Number(value).toLocaleString()}`,
              name === "collected" ? "Collected" : "Outstanding",
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
            wrapperStyle={{ fontFamily: "var(--font-open-sans)", fontSize: "12px" }}
            formatter={(value) =>
              value === "collected" ? "Collected" : "Outstanding"
            }
          />
          <Bar
            dataKey="collected"
            fill="#1B5DE5"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
          <Bar
            dataKey="outstanding"
            fill="#F0C646"
            radius={[4, 4, 0, 0]}
            maxBarSize={40}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
