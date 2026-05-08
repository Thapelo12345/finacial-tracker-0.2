"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement } from "react";
import { useEffect } from "react";
import type { ReactElement } from "react";

type Props = {
  pageUrl: string;
  linkText: string;
  btnUrl: string;
  icon?: ReactElement;
};

export default function LinkBtns({ pageUrl, linkText, btnUrl, icon }: Props) {
  const location = usePathname();
  const currentLocation: string = location;

  const styledIcon =
    isValidElement(icon) &&
    cloneElement(icon as ReactElement<{ className?: string }>, {
      className: `w-5 h-5 mr-2 ${
        currentLocation === btnUrl ? "text-green-500" : "text-white"
      }`,
    });

  return (
    <Link
      className={
        currentLocation === btnUrl
          ? "flex flex-row p-2 bg-white text-xs w-fit pr-4 text-black font-bold m-2 rounded-tr-lg rounded-br-lg"
          : "flex flex-row p-2 text-xs text-white font-bold m-2 rounded-tr-lg rounded-br-lg"
      }
      href={pageUrl}
    >
      {styledIcon}
      {linkText}
    </Link>
  );
}
