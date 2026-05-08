
export default interface Bill {
  id: number;
  title: string;
  amount: number;
  description: string;
  startDate: string;
  dueDate: string;
  endDate: string;
  lastPayment?: string;
  category: string;
  duration: string;
  frenquently: string;
  status: string;
  AutoPay: boolean;
}