import MiniDetailsCell from "./miniDetailsCell"; 
import { useState, useEffect } from "react";

type details = {
  DescriptionTitle: string;
  Amount: number;
  Color: string;
};

export default function MiniDetails() {

  const [details, setDetails] = useState<details[]>([]);

  useEffect(()=>{
      const data = sessionStorage.getItem("currentUser")

    if(data){
const user = JSON.parse(data)
setDetails(user.budgetExpenses)
    }
  },[])

  return (
    <div className="flex flex-col w-full h-full overflow-y-auto">
    {details.map((detail, idx) => (
      <MiniDetailsCell
        key={idx}
        title={detail.DescriptionTitle}
        color={detail.Color}
        amount={detail.Amount.toString()}
      />
    ))}
    </div>
  );
}
