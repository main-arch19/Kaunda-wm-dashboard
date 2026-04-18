import QuickBooksConnect from "@/components/integrations/QuickBooksConnect";

export default function IntegrationsPage() {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto">
      {/* Page heading */}
      <div>
        <h1
          className="text-2xl font-bold"
          style={{ fontFamily: "var(--font-montserrat)", color: "#0A1F4E" }}
        >
          Integrations
        </h1>
        <p
          className="text-sm text-gray-400 mt-1"
          style={{ fontFamily: "var(--font-open-sans)" }}
        >
          Connect your accounting software to keep invoices and payments in sync.
        </p>
      </div>

      {/* Integration cards grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuickBooksConnect />

        {/* Placeholder for future integrations */}
        <div
          className="bg-white p-6 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-center gap-3 min-h-[200px]"
          style={{ borderRadius: "12px" }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-gray-300 text-xl"
            style={{ backgroundColor: "#F4F6FA" }}
          >
            +
          </div>
          <div>
            <p
              className="font-bold text-gray-400 text-sm"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              More integrations coming soon
            </p>
            <p
              className="text-xs text-gray-300 mt-1"
              style={{ fontFamily: "var(--font-open-sans)" }}
            >
              Xero, Sage, M-Pesa and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
