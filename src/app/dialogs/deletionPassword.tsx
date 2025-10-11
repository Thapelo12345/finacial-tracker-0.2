"use client";

import { useState } from "react";
import { ShieldExclamationIcon } from "@heroicons/react/24/outline";
import { getPassword } from "../functions/settingsFunctions/deleteAccount";

export default function DeletionPasswaord() {
const [formState, setFormState] = useState("")
const [password, setPassword] = useState("")

  return (
    <form 
    className="flex flex-col items-center justify-centerw-fit bg-[whitesmoke] p-2 rounded-lg"
    onSubmit={(e)=>{
      e.preventDefault()
      getPassword(formState, password)
    }}
    >
      <label
        className="m-2 w-fit h-fit p-1 border-2 border-white rounded-md bg-red-500 text-white shadow-md shadow-black"
        style={{
          textShadow: "1px 1px 3px black",
        }}
      >
        Please enter you password to confirm your want to delete your account
      </label>

      <ShieldExclamationIcon className="w-10 h-10 text-yellow-300" />

      <input
        className="rounded-md p-1 m-2"
        placeholder="enter password"
        type="password"
        onChange={(e)=>{setPassword(e.target.value)}}
        style={{
          boxShadow: "inset 2px 2px 5px black",
        }}
      ></input>

      <div className="flex flex-row items-center justify-center w-full h-fit m-1 p-1">
        <button
          className="btnBounce m-2 p-2 rounded-md bg-red-500 text-white  border-2 border-white shadow-md shadow-black"
          style={{
            textShadow: "1px 1px 5px black",
          }}
          type="submit"
          onClick={()=>setFormState("delete")}
        >
          Delete
        </button>
        <button
          className="btnBounce m-2 p-2 rounded-md border-2 border-white text-white shadow-md shadow-black bg-green-500"
          style={{
            textShadow: "1px 1px 5px black",
          }}
          type="submit"
          onClick={()=>setFormState("cancel")}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
