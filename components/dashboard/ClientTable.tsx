"use client";

import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import SendReminderButton from "./SendReminderButton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { ClientRow } from "@/types";

type SortKey = "company_name" | "amount_paid" | "remaining_balance" | "last_payment_date";

const statusConfig = {
  paid:    { label: "Paid",    bg: "#DCFCE7", text: "#15803d", dot: "#22c55e" },
  partial: { label: "Partial", bg: "#FEF9C3", text: "#854d0e", dot: "#eab308" },
  unpaid:  { label: "Unpaid",  bg: "#FEE2E2", text: "#991b1b", dot: "#ef4444" },
};

interface Props { rows: ClientRow[] }

export default function ClientTable({ rows }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("remaining_balance");
  const [sortAsc, setSortAsc] = useState(false);

  function toggleSort(key: SortKey) {
    if (sortKey === key) setSortAsc((p) => !p);
    else { setSortKey(key); setSortAsc(true); }
  }

  const sorted = useMemo(() => {
    return [...rows].sort((a, b) => {
      const av = a[sortKey] ?? "";
      const bv = b[sortKey] ?? "";
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortAsc ? cmp : -cmp;
    });
  }, [rows, sortKey, sortAsc]);

  function SortIcon({ colKey }: { colKey: SortKey }) {
    if (sortKey !== colKey) return <ArrowUpDown size={12} className="opacity-40" />;
    return sortAsc ? <ArrowUp size={12} /> : <ArrowDown size={12} />;
  }

  return (
    <div
      className="bg-white overflow-hidden"
      style={{ borderRadius: "12px", boxShadow: "0 4px 20px rgba(10,31,78,0.08)" }}
    >
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 md:px-6 py-4 border-b border-gray-100">
        <div>
          <h2
            className="text-base md:text-lg font-bold"
            style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
          >
            Client Invoices
          </h2>
          <p className="text-xs text-gray-400 mt-0.5 hidden sm:block" style={{ fontFamily: "var(--font-open-sans)" }}>
            {rows.length} invoices · Tap column to sort
          </p>
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-medium shrink-0"
          style={{ backgroundColor: "#EBF0FD", color: "#1B5DE5", fontFamily: "var(--font-open-sans)" }}
        >
          {rows.filter((r) => r.status !== "paid").length} outstanding
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#F4F6FA" }}>
              {/* Client Name — always visible */}
              <TableHead className="text-xs font-bold uppercase tracking-wide py-3 min-w-[140px]"
                style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                <button onClick={() => toggleSort("company_name")}
                  className="flex items-center gap-1.5 hover:text-[#1B5DE5] transition-colors">
                  Client <SortIcon colKey="company_name" />
                </button>
              </TableHead>

              {/* Status — always visible */}
              <TableHead className="text-xs font-bold uppercase tracking-wide py-3"
                style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                Status
              </TableHead>

              {/* Last Payment — hidden on mobile */}
              <TableHead className="text-xs font-bold uppercase tracking-wide py-3 hidden md:table-cell"
                style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                <button onClick={() => toggleSort("last_payment_date")}
                  className="flex items-center gap-1.5 hover:text-[#1B5DE5] transition-colors">
                  Last Payment <SortIcon colKey="last_payment_date" />
                </button>
              </TableHead>

              {/* Amount Paid — hidden on mobile */}
              <TableHead className="text-xs font-bold uppercase tracking-wide py-3 hidden sm:table-cell"
                style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                <button onClick={() => toggleSort("amount_paid")}
                  className="flex items-center gap-1.5 hover:text-[#1B5DE5] transition-colors">
                  Paid <SortIcon colKey="amount_paid" />
                </button>
              </TableHead>

              {/* Balance Due — always visible */}
              <TableHead className="text-xs font-bold uppercase tracking-wide py-3"
                style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                <button onClick={() => toggleSort("remaining_balance")}
                  className="flex items-center gap-1.5 hover:text-[#1B5DE5] transition-colors">
                  Balance <SortIcon colKey="remaining_balance" />
                </button>
              </TableHead>

              {/* Actions — always visible */}
              <TableHead className="text-xs font-bold uppercase tracking-wide py-3"
                style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sorted.map((row) => {
              const cfg = statusConfig[row.status];
              return (
                <TableRow
                  key={row.invoice_id}
                  className="border-b border-gray-50 hover:bg-[#F4F6FA]/60 transition-colors"
                >
                  {/* Client Name */}
                  <TableCell className="py-3 md:py-4">
                    <p className="font-semibold text-sm" style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}>
                      {row.company_name}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5" style={{ fontFamily: "var(--font-open-sans)" }}>
                      {row.invoice_id}
                    </p>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap"
                      style={{ backgroundColor: cfg.bg, color: cfg.text, fontFamily: "var(--font-open-sans)" }}
                    >
                      <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cfg.dot }} />
                      {cfg.label}
                    </span>
                  </TableCell>

                  {/* Last Payment — hidden on mobile */}
                  <TableCell className="text-sm text-gray-500 hidden md:table-cell"
                    style={{ fontFamily: "var(--font-open-sans)" }}>
                    {row.last_payment_date ? formatDate(row.last_payment_date) : "—"}
                  </TableCell>

                  {/* Amount Paid — hidden on mobile */}
                  <TableCell className="text-sm font-medium hidden sm:table-cell"
                    style={{ fontFamily: "var(--font-open-sans)", color: "#0A1F4E" }}>
                    {formatCurrency(row.amount_paid)}
                  </TableCell>

                  {/* Balance Due */}
                  <TableCell>
                    <span className="font-bold text-sm"
                      style={{ fontFamily: "var(--font-montserrat)", color: row.remaining_balance > 0 ? "#dc2626" : "#16a34a" }}>
                      {formatCurrency(row.remaining_balance)}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    {row.status !== "paid" ? (
                      <SendReminderButton clientName={row.company_name} invoiceId={row.invoice_id} />
                    ) : (
                      <span className="text-xs text-gray-300">—</span>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
