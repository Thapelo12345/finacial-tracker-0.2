import MiniHeader from "./minHeader";
import MiniDetailsBtn from "./miniDetailsBtn";
import MiniTable from "./miniTable";

type Prop = {
  animate: string;
};

export default function MiniTransaction({ animate }: Prop) {
  return (
    <div className={animate}>
      <div className="bg-white rounded-lg">
        <div className="flex flex-row justify-between">
          <MiniHeader title={"Transaction"} />
          <MiniDetailsBtn pageUrl="/home/transactions"/>
        </div>

        <div className="w-full h-80 p-2">
          <MiniTable />
        </div>
      </div>
    </div>
  );
}
