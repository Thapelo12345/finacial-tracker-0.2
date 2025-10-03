import { ChevronRightIcon } from "@heroicons/react/20/solid";
// import { useRouter } from "next/router";

type inputUrl = {
  pageUrl: string;
};
export default function MiniDetailsBtn({ pageUrl }: inputUrl) {
//   const navigate = useRouter();

  return (
    <button
      className="flex text-black/50 text-xs flex-row justify-between p-3"
    //   onClick={() => navigate.push(pageUrl)}
    >
      see Details
      <ChevronRightIcon className="text-end w-4 h-4 font-bold text-black" />
    </button>
  );
}
