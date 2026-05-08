import BillLabel from "@/app/components/ui/bills/billLabel";

type Props = {
  category: string;
  duration: string;
  dueDate: string;
  startDate: string;
  endDate: string;
  lastPayment: string;
  frenquently: string;
};

export default function BillTables({
  category,
  duration,
  dueDate,
  startDate,
  frenquently,
  endDate,
  lastPayment
}: Props) {
  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col w-1/2 p-2 h-full">
        <BillLabel title="Category" value={category} />
        <BillLabel title="Duration" value={duration} />
        <BillLabel title="Due Date" value={dueDate} />
      </div>

      <div className="flex flex-col w-1/2 p-2 h-full">
        <BillLabel title="Start Date" value={startDate} />
        <BillLabel title="Frequently" value={frenquently} />
        {duration === "Set end time" && (
          <BillLabel title="End Date" value={endDate} />
        )}
           <BillLabel title="Last payment" value={lastPayment} />

      </div>
    </div>
  );
}
