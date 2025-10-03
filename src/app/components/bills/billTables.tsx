import BillLabel from "@/app/ui/bills/billLabel";

type Props = {
  category: string;
  duration: string;
  dueDate: string;
  startDate: string;
  endDate: string;
  frenquently: string;
};

export default function BillTables({
  category,
  duration,
  dueDate,
  startDate,
  frenquently,
  endDate,
}: Props) {
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2 p-2 h-full">
        <BillLabel title="Category" value={category} />
        <BillLabel title="Duration" value={duration} />
        <BillLabel title="Due Date" value={dueDate} />
      </div>
      <div className="flex flex-col w-1/2 p-2 h-full">
        <BillLabel title="Start Date" value={startDate} />
        <BillLabel title="Frenquently" value={frenquently} />
        {duration === "Set end time" && (
          <BillLabel title="End Date" value={endDate} />
        )}
      </div>
    </div>
  );
}
