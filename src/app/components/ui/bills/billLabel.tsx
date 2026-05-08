import { Exo_2 } from "next/font/google"

type Props = {
  title: string;
  value: string;
};

const exo_2 = Exo_2({
  subsets: ['latin'],
})

export default function BillLabel({ title, value }: Props) {
  return (
    <label className={`${exo_2.className} truncate w-45 tablelabels bg-white text-black/40 text-xs p-2 m-1 rounded-md`}>
      {title} :{" "}
      <span className= "text-blue-300 text-xs ">
        {value}
      </span>
    </label>
  );
}