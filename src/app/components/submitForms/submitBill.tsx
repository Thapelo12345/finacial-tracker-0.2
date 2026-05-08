"use client";
import DateInput from "@/app/components/ui/submitForms/dateInputs";
import DropDown from "@/app/components/ui/submitForms/dropDown";
import LabelInputNumber from "@/app/components/ui/submitForms/labelInputNumber";
import LabelInputText from "@/app/components/ui/submitForms/labelInputText";
import { AddBill } from "@/app/functions/bills/addBill";
import Bill from "@/app/interFaces/billInterface";
import { useDispatch } from "react-redux";
import { appUpdated } from "@/app/state management/slices/UpdateAllComponents";
import { setBillLoader } from "@/app/state management/slices/billLoader";
import { onOffSubmit } from "../../state management/slices/openSubmition";
import { useState, useEffect } from "react";
import { UpdateBill } from "@/app/functions/bills/updateBill";

type PROPS = {
  bill?: Bill;
  formType: string;
};
type SelectioDropDown = string[];

const bills: SelectioDropDown = [
  "Housing",
  "Utilities",
  "Insurance",
  "Loans & Debt",
  "Subscriptions",
  "Transportation",
  "Healthcare",
  "Childcare & Education",
  "Business Expenses",
];

const frenquentArray: SelectioDropDown = ["weekly", "monthly", "yearly"];
const statusArray: SelectioDropDown = ["active", "pause", "inactive"];
const durations: SelectioDropDown = ["continously", "Set end time"];

export default function SubmitBills({ bill, formType }: PROPS) {
  const dispatch = useDispatch();

  const [name, setName] = useState(!bill ? "" : bill.title);
  const [amount, setAmount] = useState(!bill ? 0.0 : bill.amount);
  const [description, setDescription] = useState(!bill ? "" : bill.description);
  const [duration, setDuration] = useState(
    !bill ? "continously" : bill.duration,
  );
  const [category, setCategory] = useState(!bill ? "Housing" : bill.category);
  const [frenquently, setFrenquently] = useState(
    !bill ? frenquentArray[0] : bill.frenquently,
  );
  const [status, setStatus] = useState(!bill ? statusArray[0] : bill.status);
  const [startDate, setStateDate] = useState(!bill ? "" : bill.startDate);
  const [dueDate, setDuedate] = useState(!bill ? "" : bill.dueDate);
  const [endDate, setEndDate] = useState(!bill ? "" : bill.endDate);
  const [formLoader, setFormLoader] = useState(false);

  useEffect(() => {
    dispatch(setBillLoader());
  }, [formLoader]);

  return (
    <div className="w-[200%] md:w-screen h-[95%] z-50">
      <form
        className="w-[90%] md:w-[70%] md:ml-40 lg:w-1/2 bg-[whitesmoke] m-auto mb-24 p-2 rounded-lg max-h-[95%] overflow-x-hidden overflow-y-auto"
        onSubmit={async (e) => {
          e.preventDefault();
          dispatch(onOffSubmit());

          if (new Date(startDate) >= new Date(dueDate)) {
            alert(
              "Sorry starting date cant be in the past or be same date as due date!...",
            );
            return;
          }

          // calling add bill function to add the bill to the database
          try{
          if (formType == "add") {
            await AddBill(
              name,
              description,
              amount,
              startDate,
              dueDate,
              endDate,
              category,
              duration,
              frenquently,
              status,
            );
          } //end of if

          else if (formType == "edit" && bill) {
            setFormLoader(true);
            const newBillUpdated: Bill = {
              id: bill.id,
              title: name == "" ? bill.title : name,
              amount: amount == 0.0 ? bill.amount : amount,
              description: description == "" ? bill.description : description,
              startDate: startDate == "" ? bill.startDate : startDate,
              dueDate: dueDate == "" ? bill.dueDate : dueDate,
              endDate: endDate == "" ? bill.endDate : endDate,
              lastPayment: bill.lastPayment,
              category: category == "" ? bill.category : category,
              duration: duration == "" ? bill.category : duration,
              frenquently: frenquently == "" ? bill.frenquently : frenquently,
              status: status == "" ? bill.status : status,
              AutoPay: bill.AutoPay,
            };
            await UpdateBill(newBillUpdated, setFormLoader);

         
} //end of else if

          
}//end of try
catch(err: Error | unknown){
  const errorMessage = err instanceof Error ? err.message : "unknown firebase ERROR!..."
  alert(errorMessage)
}

        }}
      >
        <h1 className="submitFormsHeaders">
          Add Bill
        </h1>

        <LabelInputText
          stateValue={name}
          title="Title"
          inputType="text"
          setValue={setName}
        />

        <LabelInputText
          stateValue={description}
          title="Description"
          inputType="text"
          setValue={setDescription}
        />

        <LabelInputNumber
          inputType="number"
          title="Installment amount"
          setValue={setAmount}
        />
<div className="flex flex-col md:flex-row w-full">
        <DateInput
          title="Start Date"
          state={startDate}
          setValue={setStateDate}
        />
        <DateInput title="Due Date" state={dueDate} setValue={setDuedate} />
</div>
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-evenly w-full">
          <DropDown
            title="Category"
            items={bills}
            setValue={(value) => setCategory(value as string)}
          />

          <DropDown
            title="Frenquently"
            items={frenquentArray}
            setValue={(value) => setFrenquently(value as string)}
          />

          <DropDown
            title="Duration"
            items={durations}
            setValue={(value) => setDuration(value as string)}
          />

          <DropDown
            title="Status"
            items={statusArray}
            setValue={(value) => setStatus(value as string)}
          />

          {duration === "Set end time" && (
            <DateInput title="End date" state={endDate} setValue={setEndDate} />
          )}
        </div>

        <div className="flex flex-row items-center justify-evenly w-full p-2">
          <button type="submit" className="submit-btn">
            Submitt
          </button>

          <button
            className="cancel-btn"
            type="button"
            onClick={() => dispatch(onOffSubmit())}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
}
