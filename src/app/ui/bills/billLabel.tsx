type Props = {
  title: string;
  value: string;
};
export default function BillLabel({ title, value }: Props) {
  return (
    <label
      className="tablelabels bg-white text-black/40 text-xs p-2 m-1 rounded-md"
      
    >
      {title} :{" "}
      <span
        style={{
          textShadow: "none",
        }}
        className="text-black text-xs font-serif font-bold"
      >
        {value.toUpperCase()}
      </span>
    </label>
  );
}
