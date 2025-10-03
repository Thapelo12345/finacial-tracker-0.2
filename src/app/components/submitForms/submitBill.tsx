"use client";
import DateInput from "@/app/ui/submitForms/dateInputs";
import DropDown from "@/app/ui/submitForms/dropDown";
import LabelInputNumber from "@/app/ui/submitForms/labelInputNumber";
import LabelInputText from "@/app/ui/submitForms/labelInputText";
import { AddBill } from "@/app/functions/bills/addBill";
import { useDispatch } from "react-redux";
import { onOffSubmit } from "../../state management/openSubmition";
import { useState } from "react";

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

export default function SubmitBills() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [duration, setDuration] = useState("continously");
  const [category, setCategory] = useState("Housing");
  const [description, setDescription] = useState("");
  const [frenquently, setFrenquently] = useState(frenquentArray[0]);
  const [status, setStatus] = useState(statusArray[0]);
  const [amount, setAmount] = useState(0);
  const [startDate, setStateDate] = useState("");
  const [dueDate, setDuedate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="absolute w-screen h-screen overflow-y-auto z-50">
      <form
        className="w-[70%] md:w-1/2 bg-[whitesmoke] m-auto mb-24 p-2 rounded-lg h-auto"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(onOffSubmit());
          AddBill(
            name,
            description,
            amount,
            startDate,
            dueDate,
            endDate,
            category,
            duration,
            frenquently,
            status
          );
        }}
      >
        <h1 className="text-black/50 text-2xl font-serif text-center font-bold">
          Add Bill
        </h1>

        <LabelInputText
          stateValue={name}
          title="Title"
          inputType="tex"
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

        <DateInput
          title="Start Date"
          state={startDate}
          setValue={setStateDate}
        />
        <DateInput title="Due Date" state={dueDate} setValue={setDuedate} />

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
          <button
            type="submit"
            className="text-green-700 font-medium p-2 w-fit rounded-sm cursor-pointer"
          >
            Submitt
          </button>

          <button
            className="text-red-700 font-medium p-2 w-fit rounded-sm cursor-pointer"
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
