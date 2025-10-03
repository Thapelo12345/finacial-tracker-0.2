type Props = {
  color: string;
  title: string;
  amount: string;
};
export default function MiniDetailsCell({ title, color, amount }: Props) {
  return (
    <div className="flex flex-row m-2">
      <div className="border-4 rounded-lg" 
      style={{ borderColor: color }}></div>

      <div className="flex flex-col p-1">
        <h5 className="text-black/50 text-xs">{title}</h5>
        <label className="text-black text-xs font-bold">R {amount}</label>
      </div>

    </div>
  );
}
