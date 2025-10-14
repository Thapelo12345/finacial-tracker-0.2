"use client";
import LabelInputText from "@/app/ui/submitForms/labelInputText";
import LabelInputNumber from "@/app/ui/submitForms/labelInputNumber";
import DropDown from "@/app/ui/submitForms/dropDown";
import { useDispatch } from "react-redux";
import { onOffSubmit } from "../../state management/openSubmition";
import { useState, useEffect } from "react";
import AddTransaction from "@/app/functions/transactionFunctions/AddTransaction";
import { useSelector } from "react-redux";
import type { RootState } from "../../state management/store";

type Categories = string[];

const categories: Categories = [
  "Salary",
  "Groceries",
  "Rent",
  "Utilities",
  "Transportation",
  "Entertainment",
  "Dining Out",
  "Healthcare",
  "Education",
  "Shopping",
  "Savings",
  "Investments",
  "Debt Payments",
];

export default function TransactionSubmit() {
  const dispatch = useDispatch();
  const checkUpdate = useSelector(
    (state: RootState) => state.updateApp.updateApp
  );

  const [name, setName] = useState("");
  const [transactionType, setTransactionType] = useState("Income");
  const [amount, setAmount] = useState(0.0);
  const [description, setDescription] = useState("");
  const [selectedCategory, setCategory] = useState("Salary");

  useEffect(() => {
    setTransactionType("Income");
    setCategory("Salary");
  }, [checkUpdate]);

  return (
    <div className="md:left-0 w-full md:w-screen h-screen overflow-y-auto">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          AddTransaction({
            Name: name,
            Amount: amount,
            Category: selectedCategory,
            Description: description,
            TransactionType: transactionType,
          });

          dispatch(onOffSubmit());
          setName("");
          setAmount(0);
          setDescription("");
          setCategory("");
          setTransactionType("");
        }}
        className="flex flex-col w-[90%] md:w-1/2 items-start bg-[whitesmoke] mt-10 self-center justify-self-center mb-24 p-2 rounded-lg overflow-x-hidden"
      >
        <h1 className="text-black/50 text-2xl font-serif text-center font-bold">
          Transaction
        </h1>

        <LabelInputText
          title="Title"
          inputType="text"
          stateValue={name}
          setValue={setName}
        />

        <LabelInputNumber
          inputType="number"
          title="amount"
          setValue={setAmount}
        />

        <label className="text-black w-full font-serif rounded-tr-lg rounded-br-lg font-extrabold">
          <textarea
            className="text-xs ml-6 bg-white/20 border-0 rounded-lg h-15 w-[85%] md:w-[90%] lg:w-[70%] focus:outline-0 p-2"
            style={{
              boxShadow: "inset 2px 2px 5px #BABECC, inset -5px -5px 10px #FFF",
            }}
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </label>

        <div className="flex flex-col sm:flex-row items-center justify-center w-full m-2">
          <DropDown
            title="Category"
            items={categories}
            currentValue={selectedCategory}
            setValue={setCategory}
          />

          <DropDown
            title="Transaction Type"
            items={["income", "expense"]}
            currentValue={transactionType}
            setValue={setTransactionType}
          />
        </div>

        <div className="flex flex-row items-center justify-evenly w-full p-2">
          <button
            type="submit"
            // className="text-green-700 font-medium p-2 w-fit rounded-sm cursor-pointer"
            className="p-2 text-white font-medium bg-green-400 rounded-sm m-2 cursor-pointer"
            style={{
              boxShadow: "inset 5px 1px 5px black, inset -2px 2px 5px grey",
            }}
          >
            Submitt
          </button>

          <button
            // className="text-red-700 font-medium p-2 w-fit rounded-sm cursor-pointer"
            className="p-2 text-white font-medium bg-red-400 rounded-sm m-2 cursor-pointer"
            style={{
              boxShadow: "inset 5px 1px 5px black, inset -2px 2px 5px grey",
            }}
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
