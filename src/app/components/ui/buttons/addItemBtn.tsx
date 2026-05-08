import { PlusCircleIcon } from "@heroicons/react/20/solid";

type Props = {
  tipText: string;
  btnFunction: () => void;
};

export default function AddItemBtn({ tipText, btnFunction }: Props) {
  return (
    <button className="group relative m-2 p-2 w-auto" onClick={btnFunction}>
      <PlusCircleIcon className="w-10 h-10 text-green-400" />

      <div
        className="absolute w-40 p-2 transition duration-500 rotate-y-3 group-hover:rotate-y-360 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-100 bottom-16 left-0 rounded-lg"
        style={{
          boxShadow: "1px 3px 30px darkgreen",
          border: "1px solid lime",
          backgroundImage: "linear-gradient(0deg, darkgreen, lime)",
        }}
      >
        <span
          className="text-white text-sm p-0 m-0"
          style={{
            textShadow: "1px 1px 2px black",
          }}
        >
          {tipText}
        </span>
      </div>
    </button>
  );
}
