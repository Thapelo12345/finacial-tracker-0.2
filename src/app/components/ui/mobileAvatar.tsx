"use client";

const colors: string[] = [
  "Navy",
  "DarkRed",
  "DarkGreen",
  "Maroon",
  "Purple",
  "Indigo",
  "Teal",
  "Olive",
  "DarkSlateGray",
  "DarkBlue",
  "DarkCyan",
  "DarkMagenta",
  "DarkOliveGreen",
  "DarkSlateBlue",
  "DarkGoldenrod",
  "DarkSlateGrey",
  "DarkKhaki",
  "DarkOrchid",
  "DarkSeaGreen",
  "FireBrick",
  "SaddleBrown",
  "MidnightBlue",
  "Chocolate",
  "DimGray",
  "DarkViolet",
  "Brown",
];

const alphabet: string[] = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(65 + i)
);

type Props = {
  name: string;
  avatar: string;
};

function getInitials(name: string): string {
  const words = name.trim().split(" ");
  const initials =
    words.length > 1 ? words[0][0] + words[words.length - 1][0] : words[0][0];
  return initials.toUpperCase();
}

export default function MobileAvatar({ name, avatar }: Props) {
  return (
    <div
      className={`bg-blue-400 w-8 h-8 p-0 absolute left-[40px] bottom-10 rounded-sm z-20 overflow-hidden
        ${avatar === "" ? "border-2 border-white" : "border-0"}
        `}
      style={{
        backgroundColor:
          colors[alphabet.indexOf(name[0].toUpperCase()) % colors.length],
      }}
    >
      {avatar === "" && (
        <h1 className="ml-[13%] mt-[15%] text-center text-sm md:text-md text-white font-bold">
          {getInitials(name)}
        </h1>
      )}

      {avatar !== "" && (
        <img
          className="text-sm text-center w-full h-full cover"
          src={avatar}
          alt="User"
        ></img>
      )}
    </div>
  );
}
