"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cloneElement, isValidElement } from "react";
import type { ReactElement } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/app/state_management/store";

type Props = {
  pageUrl: string;
  linkText: string;
  btnUrl: string;
  icon?: ReactElement;
};

export default function LinkBtns({ pageUrl, linkText, btnUrl, icon }: Props) {

  const appLoading = useSelector((state: RootState)=> state.appLoadStatus.appLoadingStatus)
  
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
      className={`
        ${appLoading ? "pointer-events-none" : "pointer-events-auto"}
        ${currentLocation === btnUrl ? "bg-white w-fit pr-4 text-black" : "text-white"} flex flex-row p-2 text-xs rounded-br-lg rounded-tr-lg font-bold m-2`
      }
      href={pageUrl}
    >
      {styledIcon}
      {linkText}
    </Link>
  );
}
