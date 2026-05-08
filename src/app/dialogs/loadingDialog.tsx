import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const time = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

const dotsTimeline = gsap.timeline({
  repeat: -1,
  yoyo: true,
});

export default function Loanding() {
  useGSAP(() => {
    dotsTimeline.from(".dots", {
      translateX: -90,
      stagger: 0.4,
      repeat: -1,
      delay: 0.1,
      duration: 0.5,
    });
  }, []);

  return (
    <div className="shadow-4xl flex flex-col items-center justify-center w-[90%] h-1/2 md:w-1/2  rounded-lg">

      <div className="w-full p-2 flex flex-row items-center justify-center">
        <h1 className="text-4xl text-white font-medium tracking-widest m-2">
          LOADING
        </h1>

        <div className="flex flex-row items-center h-1/2 w-1/2 overflow-hidden">
          <span className="dots text-white text-[60px] text-2xl ml-2 mb-4">
            .
          </span>
          <span className="dots text-white text-[60px] text-2xl ml-2 mb-4">
            .
          </span>
          <span className="dots text-white text-[60px] text2xl ml-2 mb-4">
            .
          </span>
        </div>
      </div>
    </div>
  );
}
