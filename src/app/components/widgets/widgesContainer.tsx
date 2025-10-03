import MiniBudget from "./miniBudget";
import MiniPots from "./miniPots";
import MiniTransaction from "./niniTransaction";
import MiniBills from "./miniBills";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export default function Widgets() {
  const animateWidgets: string = "widget";

  useGSAP(() => {
    gsap.fromTo(
      ".widget",
      {
        scale: 0.1,
        opacity: 0.3,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "circ.inOut",
        stagger: 0.3,
      }
    );
  });
  return (
    <div className="flex flex-col justify-evenly md:justify-evenly md:flex-row w-full p-1 m-0">

      <div className="w-full md:w-1/2 md:h-10 m-2 mb-4 p-4">
        <MiniPots animate={animateWidgets} />
        <MiniTransaction animate={animateWidgets} />
      </div>

      <div className="flex flex-col w-full md:w-1/2  m-2 p-4">
        <MiniBudget animate={animateWidgets} />
        <MiniBills animate={animateWidgets} />
      </div>
    </div>
  );
}
