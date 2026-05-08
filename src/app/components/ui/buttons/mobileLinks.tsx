"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement } from "react";
import { useContext } from "react";
import { SettingsContext } from "@/app/context/settingsContext";
import type { ReactElement } from "react";

type Props = {
  pageUrl: string;
  toolTip: string;
  btnUrl: string;
  icon?: ReactElement;
};

export default function MobileLinks({ pageUrl, toolTip, btnUrl, icon }: Props) {
  const settings = useContext(SettingsContext);
  const location = usePathname();

  const styledIcon =
    isValidElement(icon) &&
    cloneElement(icon as ReactElement<{ className?: string }>, {
      className: `w-5 h-5 mr-2 ${
        location === btnUrl ? "text-green-500" : "text-white"
      }`,
    });

  return (
    <Link
      href={pageUrl}
      style={{ pointerEvents: settings.currentValue ? "none" : "auto" }}
      className={`flex flex-row p-1 md:p-2 text-xs m-1 md:m-2 ${
        location === btnUrl
          ? "inline-block border-b-2 border-green-500 text-green-400 bg-white rounded-tr-lg rounded-tl-lg"
          : "text-white"
      }`}
      title={toolTip}
    >
      {styledIcon}
    </Link>
  );
}
