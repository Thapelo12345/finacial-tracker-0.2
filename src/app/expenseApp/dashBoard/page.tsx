"use client"
import PageHeader from "@/app/ui/pageHeader";
import Balances from "@/app/ui/balance";
import Widgets from "@/app/components/widgets/widgesContainer";

export default function Overview() {
  return (
    <div className="m-0 p-4 pb-15 md:pb-4 bg-white/50 w-screen h-screen overflow-y-auto">
      <PageHeader title={"Overview"} />
      <Balances />
      <Widgets />
    </div>
  );
}
