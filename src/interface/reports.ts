export interface Reports {
  guest_fullname: string;
  room_no: string;
  check_in: string;
  check_out: string;
  no_of_nights: number;
  payment_amount: number;
  payment_date: string;
  payment_method: "Cash" | "Credit-card" | "E-Cash";
  booking_type: "Online" | "Walk-in";
  additional_service: "Breakfast" | null;
  outstanding_balance: number | null;
  discount: "pwd" | "senior" | null;
}

export interface TransactionReportProps {
  transactions: Reports[];
}
