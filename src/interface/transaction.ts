export interface Transaction {
  transaction_id: number;
  guest_id: number;
  room_id: number;
  employee_id: number;
  payment_method: string;
  payment_amount: number;
  payment_date: string;
  booking_type: string;
  check_in: string;
  check_out: string;
  additional_services: string[];
  transaction_status: string;
  total_days: number;
}

export interface TransactionData {
    transactions : Transaction[];
}