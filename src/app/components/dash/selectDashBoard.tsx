"use client"
import { useState, useEffect } from "react";
import Dash from "./dash";
import MobileDash from "./mobileDash";

export default function SelectDashBoard() {
  const [isDesktop, setDesktop] = useState<boolean | null>(null);

  useEffect(() => {
    const handleResize = () => setDesktop(window.innerWidth > 768);

    handleResize(); // set initial value
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isDesktop === null) return null; // or loading indicator

  return isDesktop ? <Dash /> : <MobileDash />;
}
