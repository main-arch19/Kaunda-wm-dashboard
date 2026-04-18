export interface Client {
  id: string;
  company_name: string;
  quickbooks_customer_id: string | null;
  created_at: string;
}

export interface Invoice {
  id: string;
  client_id: string;
  total_due: number;
  due_date: string;
  status: "paid" | "partial" | "unpaid";
  created_at: string;
}

export interface Payment {
  id: string;
  invoice_id: string;
  amount_paid: number;
  date_paid: string;
  logged_by_user_id: string;
  created_at: string;
}

/** Denormalized row used by the UI table — joins client + invoice + aggregated payments */
export interface ClientRow {
  client_id: string;
  company_name: string;
  invoice_id: string;
  total_due: number;
  due_date: string;
  status: "paid" | "partial" | "unpaid";
  amount_paid: number;
  remaining_balance: number;
  last_payment_date: string | null;
}

export interface MonthlyRevenue {
  month: string;
  collected: number;
  outstanding: number;
}

export interface DonutSlice {
  name: string;
  value: number;
  color: string;
}
