"use client";
type Props = {
  title: string;
  items: string[];
  currentValue?: string;
  setValue: (value: string) => void;
};

export default function DropDown({
  title,
  items,
  currentValue,
  setValue,
}: Props) {
  return (
    <div className="w-fit flex flex-col items-center justify-center sm:w-1/2">
      <label className="w-fit text-black/50 font-serif font-extrabold p-2 rounded-tr-lg rounded-br-lg m-2">
        {title}
      </label>
      <select
        className="text-black font-semibold text-xs m-4 focus:outline-0 p-2 rounded-lg"
        style={{
          boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
        }}
        value={currentValue}
        onChange={(e) => setValue(e.target.value)}
        required
      >
        {items.map((item: string) => (
          <option key={item} value={item}>
            {item.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
}
