

type Props = {
  title: string;
  amount: number;
  color: string;
};

export default function MiniPotsCard({ title, amount, color }: Props) {
  return (
    <div className="flex flex-row w-auto h-[40%] mb-0 p-1 m-2 overflow-hidden">
      <div
        className="border-4 h-10 m-1 rounded-lg"
        style={{ borderColor: color }}
      ></div>

      <div className="flex flex-col h-full w-full p-0">
        <h6 className="text-black text-xs m-0 p-1"> {title} </h6>
        <h5 className="text-black text-xs font-bold m-0 p-1">R {amount} </h5>
      </div>
    </div>
  );
}