"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  CheckCircle,
  RefreshCw,
  AlertCircle,
  ExternalLink,
  Loader2,
} from "lucide-react";

export default function QuickBooksConnect() {
  const [status, setStatus] = useState<"disconnected" | "connecting" | "connected">(
    "disconnected"
  );

  function handleConnect() {
    setStatus("connecting");
    // Production: redirect to /api/quickbooks/oauth/start
    setTimeout(() => {
      setStatus("connected");
      toast.success("QuickBooks connected!", {
        description: "Invoices and payments will now sync automatically.",
      });
    }, 1800);
  }

  function handleSync() {
    toast.info("Syncing with QuickBooks…", {
      description: "This may take a few seconds.",
    });
    setTimeout(() => {
      toast.success("Sync complete!", {
        description: "All invoices and payments are up to date.",
      });
    }, 2000);
  }

  return (
    <div
      className="bg-white p-6 max-w-lg"
      style={{
        borderRadius: "12px",
        boxShadow: "0 4px 20px rgba(10,31,78,0.08)",
      }}
    >
      {/* Header */}
      <div className="flex items-start gap-4 mb-5">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg shrink-0"
          style={{ backgroundColor: "#2CA01C" }}
        >
          QB
        </div>
        <div>
          <h3
            className="font-bold text-base"
            style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
          >
            QuickBooks Online
          </h3>
          <p
            className="text-sm text-gray-500 mt-0.5"
            style={{ fontFamily: "var(--font-open-sans)" }}
          >
            Sync invoices, payments, and client records with your accounting software.
          </p>
        </div>
      </div>

      {/* Status indicator */}
      {status === "connected" && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-sm"
          style={{
            backgroundColor: "#DCFCE7",
            color: "#15803d",
            fontFamily: "var(--font-open-sans)",
          }}
        >
          <CheckCircle size={15} />
          <span className="font-medium">Connected</span>
          <span className="text-green-600/70">· Last synced 2 hours ago</span>
        </div>
      )}

      {status === "disconnected" && (
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg mb-4 text-sm"
          style={{
            backgroundColor: "#FEF9C3",
            color: "#854d0e",
            fontFamily: "var(--font-open-sans)",
          }}
        >
          <AlertCircle size={15} />
          Not connected — invoices are not syncing
        </div>
      )}

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        {status === "disconnected" && (
          <Button
            onClick={handleConnect}
            className="text-white font-semibold rounded-lg"
            style={{
              backgroundColor: "#2CA01C",
              fontFamily: "var(--font-montserrat)",
            }}
          >
            <ExternalLink size={15} className="mr-2" />
            Connect to QuickBooks
          </Button>
        )}

        {status === "connecting" && (
          <Button disabled className="rounded-lg" style={{ backgroundColor: "#2CA01C", color: "white" }}>
            <Loader2 size={15} className="mr-2 animate-spin" />
            Connecting…
          </Button>
        )}

        {status === "connected" && (
          <>
            <Button
              onClick={handleSync}
              variant="outline"
              className="rounded-lg border-[#2CA01C] text-[#2CA01C] hover:bg-[#2CA01C] hover:text-white transition-colors"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              <RefreshCw size={14} className="mr-2" />
              Sync Now
            </Button>
            <Button
              onClick={() => {
                setStatus("disconnected");
                toast.info("Disconnected from QuickBooks.");
              }}
              variant="outline"
              className="rounded-lg border-red-200 text-red-500 hover:bg-red-50"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Disconnect
            </Button>
          </>
        )}
      </div>

      {/* Feature list */}
      <div className="mt-5 pt-5 border-t border-gray-100">
        <p
          className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          What syncs
        </p>
        <ul className="space-y-2">
          {[
            "Client records and contact details",
            "Invoice creation and status updates",
            "Payment logging and reconciliation",
            "Outstanding balance calculations",
          ].map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-sm text-gray-600"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: "#1B5DE5" }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
