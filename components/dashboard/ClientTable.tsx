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
import { Badge } from "@/components/ui/badge";
import SendReminderButton from "./SendReminderButton";
import { formatCurrency, formatDate } from "@/lib/utils";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import type { ClientRow } from "@/types";

type SortKey = "company_name" | "amount_paid" | "remaining_balance" | "last_payment_date";

const statusConfig = {
  paid: {
    label: "Paid in Full",
    bg: "#DCFCE7",
    text: "#15803d",
    dot: "#22c55e",
  },
  partial: {
    label: "Partially Paid",
    bg: "#FEF9C3",
    text: "#854d0e",
    dot: "#eab308",
  },
  unpaid: {
    label: "Unpaid",
    bg: "#FEE2E2",
    text: "#991b1b",
    dot: "#ef4444",
  },
};

interface Props {
  rows: ClientRow[];
}

export default function ClientTable({ rows }: Props) {
  const [sortKey, setSortKey] = useState<SortKey>("remaining_balance");
  const [sortAsc, setSortAsc] = useState(false);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortAsc((p) => !p);
    } else {
      setSortKey(key);
      setSortAsc(true);
    }
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
    if (sortKey !== colKey) return <ArrowUpDown size={13} className="opacity-40" />;
    return sortAsc ? <ArrowUp size={13} /> : <ArrowDown size={13} />;
  }

  const cols: { key: SortKey | null; label: string }[] = [
    { key: "company_name", label: "Client Name" },
    { key: null, label: "Status" },
    { key: "last_payment_date", label: "Last Payment" },
    { key: "amount_paid", label: "Amount Paid" },
    { key: "remaining_balance", label: "Balance Due" },
    { key: null, label: "Actions" },
  ];

  return (
    <div
      className="bg-white overflow-hidden"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(10,31,78,0.08)",
      }}
    >
      {/* Table header bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <div>
          <h2
            className="text-lg font-bold"
            style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
          >
            Client Invoices
          </h2>
          <p
            className="text-xs text-gray-400 mt-0.5"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            {rows.length} invoice{rows.length !== 1 ? "s" : ""} · Click column headers to sort
          </p>
        </div>
        <span
          className="text-xs px-3 py-1 rounded-full font-medium"
          style={{
            backgroundColor: "#EBF0FD",
            color: "#1B5DE5",
            fontFamily: "var(--font-open-sans)",
          }}
        >
          {rows.filter((r) => r.status !== "paid").length} outstanding
        </span>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow style={{ backgroundColor: "#F4F6FA" }}>
              {cols.map(({ key, label }) => (
                <TableHead
                  key={label}
                  className="text-xs font-bold uppercase tracking-wide py-3"
                  style={{
                    fontFamily: "var(--font-montserrat)",
                    color: "#0A1F4E",
                  }}
                >
                  {key ? (
                    <button
                      onClick={() => toggleSort(key)}
                      className="flex items-center gap-1.5 hover:text-[#1B5DE5] transition-colors"
                    >
                      {label}
                      <SortIcon colKey={key} />
                    </button>
                  ) : (
                    label
                  )}
                </TableHead>
              ))}
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
                  <TableCell className="py-4">
                    <div>
                      <p
                        className="font-semibold text-sm"
                        style={{
                          fontFamily: "var(--font-montserrat)",
                          color: "#0A1F4E",
                        }}
                      >
                        {row.company_name}
                      </p>
                      <p
                        className="text-xs text-gray-400 mt-0.5"
                        style={{ fontFamily: "var(--font-open-sans)" }}
                      >
                        {row.invoice_id}
                      </p>
                    </div>
                  </TableCell>

                  {/* Status Badge */}
                  <TableCell>
                    <span
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                      style={{
                        backgroundColor: cfg.bg,
                        color: cfg.text,
                        fontFamily: "var(--font-open-sans)",
                      }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: cfg.dot }}
                      />
                      {cfg.label}
                    </span>
                  </TableCell>

                  {/* Last Payment */}
                  <TableCell
                    className="text-sm text-gray-500"
                    style={{ fontFamily: "var(--font-open-sans)" }}
                  >
                    {row.last_payment_date ? formatDate(row.last_payment_date) : "—"}
                  </TableCell>

                  {/* Amount Paid */}
                  <TableCell
                    className="text-sm font-medium"
                    style={{
                      fontFamily: "var(--font-open-sans)",
                      color: "#0A1F4E",
                    }}
                  >
                    {formatCurrency(row.amount_paid)}
                  </TableCell>

                  {/* Balance Due */}
                  <TableCell>
                    <span
                      className="font-bold text-sm"
                      style={{
                        fontFamily: "var(--font-montserrat)",
                        color:
                          row.remaining_balance > 0 ? "#dc2626" : "#16a34a",
                      }}
                    >
                      {formatCurrency(row.remaining_balance)}
                    </span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell>
                    {row.status !== "paid" ? (
                      <SendReminderButton
                        clientName={row.company_name}
                        invoiceId={row.invoice_id}
                      />
                    ) : (
                      <span className="text-xs text-gray-300" style={{ fontFamily: "var(--font-open-sans)" }}>
                        —
                      </span>
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
