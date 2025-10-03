import { useGSAP } from "@gsap/react";
import { TrashIcon } from "@heroicons/react/20/solid";
import { deleteBudgetExpense } from "@/app/functions/budget/deleteBudgetExpense";
import gsap from "gsap";

type details = {
  budgetExpenseId: number;
  DescriptionTitle: string;
  Amount: number;
  Color: string;
};

type GraphDetailsProps = {
  budgetItem?: details[]; // Make it optional with a default value
};

export default function GraphDetails({ budgetItem = [] }: GraphDetailsProps) {
  useGSAP(() => {
    const items = gsap.utils.toArray(".details-animation");

    items.forEach((item, i) => {
      const tl = gsap.timeline({ delay: i * 0.3 });

      // Slide in
      tl.fromTo(
        item as HTMLElement,
        { x: -600 },
        { x: 0, duration: 0.8, ease: "circ.out" }
      ).fromTo(
        item as HTMLElement,
        { rotateY: 90 },
        { rotateY: 0, duration: 3.4, ease: "circ.out" },
        "-=0.3"
      );
    });
  });

  return (
    <div className="flex flex-wrap rounded-sm items-center justify-start w-full overflow-x-hidden overflow-y-auto p-2 m-2">
      {budgetItem.map((details) => (
        <div
          key={details.DescriptionTitle}
          className="details-animation flex flex-row items-center justify-evenly h-8 ml-2 m-2"
        >
          <div className="flex flex-row items-center justify-evenly rounded-sm h-full bg-white p-2 shadow-lg m-2">
            <div
              className="border-4 h-full m-2"
              style={{
                borderColor: details.Color,
                backgroundColor: details.Color,
                perspective: 1000,
              }}
            ></div>
            <h4 className="text-black text-sm font-normal">
              {details.DescriptionTitle}
            </h4>
          </div>

          <button
            onClick={() => {
              deleteBudgetExpense(details.budgetExpenseId);
            }}
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
