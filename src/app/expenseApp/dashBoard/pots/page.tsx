"use client"
import PageHeader from "@/app/ui/pageHeader";
import BalanceContainer from "@/app/ui/balanceContainer";
import PotsCard from "@/app/components/pots/potCard";
import { useState, useEffect } from "react";
import { db } from "../../../../../firebase.config";
import { collection, getDocs, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { selectDialog } from "@/app/state management/selectDialog";
import { openCloseDialog } from "@/app/state management/openCloseDialog";
import { getMessage } from "@/app/state management/dialogMessage";
import { appUpdated } from "@/app/state management/UpdateAllComponents";
// import AddItemBtn from "@/app/ui/buttons/addItemBtn";

export default function Pots() {

  const dispatch = useDispatch()

  const [potValue, setPotValue] = useState(0);
  const [giftCard, setGiftCard] = useState(0);
  const [voucher, setVoucher] = useState(0);
  const [saving, setSaving] = useState(0);

  useEffect(()=>{
    setPotValue(giftCard + voucher + saving)
    const newPotValue = giftCard + voucher + saving

    const data = sessionStorage.getItem("currentUser")
    if(data){
      const currentUser = JSON.parse(data)

      getDocs(collection(db, "users"))
      .then((getDocuments)=> getDocuments.docs.find((doc) => doc.data().email === currentUser.email))
      .then((foundUser)=>{
        if(!foundUser){
          dispatch(selectDialog("error"))
          dispatch(getMessage("User credentials not found"))
          dispatch(openCloseDialog())
        }

        else{

          dispatch(selectDialog("load"))
          dispatch(openCloseDialog())

          updateDoc(foundUser.ref, {
            potsValue: newPotValue,
            giftCard: giftCard,
            savings: saving,
            vouchers: voucher
          }).then(()=> {
            dispatch(openCloseDialog())
            dispatch(appUpdated())
          })
          .catch((error)=> console.log(error))

          currentUser.potsValue = potValue
          currentUser.giftCard = giftCard
          currentUser.savings = saving
          currentUser.vouchers = voucher
          sessionStorage.setItem("currentUser", JSON.stringify(currentUser))
        }
      })
      .catch(()=>{
        dispatch(selectDialog("error"))
        dispatch(getMessage("Sorry!.., The was an error while updating your data. Please try again"))
        dispatch(openCloseDialog())
      })
    }


  },[giftCard, saving, voucher])

  
  // const addPot = () => {
  //   console.log("pot added!..")
  // }

  useEffect(() => {

  const data = sessionStorage.getItem("currentUser");
    if (data) {
      const user = JSON.parse(data);

      setPotValue(user.potsValue);
      setGiftCard(user.giftCard);
      setVoucher(user.vouchers);
      setSaving(user.savings);
    }
  }, []);


  return (
    <main className="m-2 p-4 pb-15 md:pb-4 w-screen h-screen overflow-y-auto">
      <PageHeader title="Pots" />

      <div className="flex flex-col md:flex-row w-full justify-start p-2">
        <BalanceContainer
          activeClick={false}
          title="Pots Value"
          amount={potValue}
        />
      </div>

      <div
        className="flex flex-col sm:flex-row flex-wrap justify-start w-full"
        style={{ perspective: "1000px" }}
      >
        <PotsCard title="Gift cards" amount={giftCard} getAmount={setGiftCard} />
        <PotsCard title="Savings" amount={saving} getAmount={setSaving} />
        <PotsCard title="Voucher" amount={voucher} getAmount={setVoucher} />
        
      {/* <AddItemBtn tipText="Add custom pot" btnFunction={addPot} /> */}
      </div>
    </main>
  );
}
