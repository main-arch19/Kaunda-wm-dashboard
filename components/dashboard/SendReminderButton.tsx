"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Send } from "lucide-react";

interface Props {
  clientName: string;
  invoiceId: string;
}

export default function SendReminderButton({ clientName, invoiceId }: Props) {
  const [sending, setSending] = useState(false);

  async function handleReminder() {
    setSending(true);
    // Simulate API call — replace with real endpoint in production
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`Reminder sent to ${clientName}`, {
      description: `Payment reminder for ${invoiceId} dispatched successfully.`,
    });
    setSending(false);
  }

  return (
    <Button
      size="sm"
      variant="outline"
      onClick={handleReminder}
      disabled={sending}
      className="border-[#1B5DE5] text-[#1B5DE5] hover:bg-[#1B5DE5] hover:text-white rounded-lg text-xs h-8 px-3 transition-colors"
      style={{ fontFamily: "var(--font-open-sans)" }}
    >
      <Send size={12} className="mr-1.5" />
      {sending ? "Sending…" : "Send Reminder"}
    </Button>
  );
}
