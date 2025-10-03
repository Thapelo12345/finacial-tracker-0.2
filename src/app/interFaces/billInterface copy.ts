
export interface DataBaseBill {
  id: number;
  title: string;
  description: string;
  amount: number;
  startDate: string;
  dueDate: string;
  endDate: string;
  category: string;
  duration: string;
  frenquently: string;
  status: string;
}

export default interface Bill {
  billId: number;
  title: string;
  amount: string;
  description: string;
  startDate: string;
  dueDate: string;
  endDate: string;
  category: string;
  duration: string;
  frenquently: string;
  status: string;
  AutoPay: boolean;
  settleBill: boolean;
  days: string;
}