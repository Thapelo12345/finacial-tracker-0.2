type Props = {
  title: string;
  color: string;
  amount: number;
};
export default function MiniBillsCell({ title, color, amount }: Props) {
  return (
    <div className="h-12 bg-black/5 flex flex-row rounded-lg p-0 m-2">
      <div
        className=" border-4 h-full rounded-tl-lg rounded-bl-lg"
        style={{ borderColor: color }}
      ></div>

      <div className=" w-full flex flex-row justify-between p-2">
        <label className="text-sm font-semibold text-black/50">{title}</label>
        <h4 className="text-sm font-san text-black">R {amount}</h4>
      </div>
    </div>
  );
}
