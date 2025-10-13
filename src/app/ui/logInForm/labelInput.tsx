"use client"

type Props = {
  InputType: string;
  title: string;
  inputedValue: string;
  sendValue: (value: string) => void;
};

export default function LabelInput({
InputType,
  title,
  inputedValue,
  sendValue,
}:Props){

return(
<div className="flex flex-row items-center justify-center w-[90%] sm:w-[70%] m-1">
<label className="flex flex-row text-sm text-black font-semibold w-30 md:w-full p-1 m-0">{title} : </label>
      <input
        className="bg-white text-black text-xs w-full h-full m-2 p-2 focus:border-blue-500 outline-none hover:shadow-lg rounded-md"
        style={{boxShadow: "inset 2px 2px 4px hsl(10, 3%, 10%), inset -5px -5px 5px rgba(255, 255, 255, 0.4)"}}
        type={InputType}
        value={inputedValue}
        onChange={(e) => sendValue(e.target.value)}
        required
      ></input>
</div>
    )
}