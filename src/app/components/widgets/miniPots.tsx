import MiniHeader from "./minHeader";
import MiniDetailsBtn from "./miniDetailsBtn";
import MiniPotsCard from "./miniPotCard";
import { useState , useEffect} from "react";
import { DocumentCurrencyDollarIcon } from "@heroicons/react/20/solid";

type Prop = {
  animate: string
}

export default function MiniPots({animate}:Prop) {

    const [postValue, setpotValue] = useState(0)
  const [giftCard, setGiftCard] = useState(0)
  const [voucher, setVoucher] = useState(0)
  const [saving, setSaving] = useState(0)

  useEffect(()=>{
    const data = sessionStorage.getItem("currentUser")

    if(data){
      const user = JSON.parse(data)

      setpotValue(user.potsValue)
      setGiftCard(user.giftCard)
      setVoucher(user.vouchers)
      setSaving(user.savings)
    }
  },[])

  return (
    <div className={`bg-white w-full m-0 sm:m-4 p-2 hover:shadow-2xl rounded-lg ${animate}`}>
      <div className="flex flex-row justify-between">
        <MiniHeader title={"Pots"} />
        <MiniDetailsBtn pageUrl="/home/pots"/>
      </div>

      <div className="h-40 flex flex-row">
        <div className="flex flex-row bg-black/5 w-[80%] rounded-lg p-0">
          <DocumentCurrencyDollarIcon className=" text-green-400 w-20 h-20 mr-1 self-center" />

          <div className="flex flex-col w-full justify-center">
            <h4 className="text-sm font-medium text-black/50 mb-2">
              Total Saving
            </h4>
            <label className="text-md md:text-md font-extrabold text-black">
              R {postValue}
            </label>
          </div>
        </div>

        {/* details container */}
        <div className="flex flex-row flex-wrap w-full p-0 overflow-hidden">
          <MiniPotsCard title="Savings" amount={saving} color={"green"} />
          <MiniPotsCard title="Gift Cards" amount={giftCard} color={"cyan"} />
          <MiniPotsCard title="Vouchers" amount={voucher} color={"orange"} />
        </div>
      </div>
    </div>
  );
}