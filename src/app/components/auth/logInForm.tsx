"use client";

import { UserCircleIcon } from "@heroicons/react/20/solid";
import LabelInput from "@/app/components/ui/logInForm/labelInput";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { handleGooglAthentication } from "@/app/functions/authFunctions/googleLogIn";
import EmailAuthentication from "@/app/functions/authFunctions/emailLogIn";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ResetPassword } from "@/app/functions/authFunctions/forgotPassword";

export default function AuthenticationForm() {
  const navigate = useRouter();

  const [formState, setForm] = useState("logIn");
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const reEnter = useRef("");

  const showInputs = () => {
    return formState === "register" || formState === "logIn";
  };
  const showInputs1 = () => {
    return formState === "register" || formState === "reset";
  };

  useGSAP(() => {
    gsap.fromTo(
      "#formAnimation",
      {
        scale: 0.2,
        rotateY: 360,
      },
      {
        scale: 1,
        rotateY: 0,
        duration: 1,
        ease: "expo.in",
      }
    );
  });

  const handleGoogleAuthClick = async () => {
    await handleGooglAthentication(navigate.push);
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        if (formState === "reset") {
          ResetPassword(email.current);
        } else {
          EmailAuthentication({
            registerLogIn: formState,
            email: email.current,
            password: password.current,
            reEnterPassword: reEnter.current,
            userName: username.current,
            NavigateFunction: navigate.push,
          });
        }
        if (formState === "register" || formState === "reset") {
          setForm("logIn");
        }
        username.current = "";
        email.current = "";
        password.current = ""
        reEnter.current = ""
      }}
      id="formAnimation"
      className="app-logIn"
    >
      <UserCircleIcon className="w-30 h-20 text-blue-300" />

      {formState === "register" && (
        <LabelInput
          InputType="text"
          title="Usename"
          inputedValue={username.current}
          sendValue={username}
        />
      )}

      <LabelInput
        InputType="email"
        title="Email"
        inputedValue={email.current}
        sendValue={email}
      />

      {showInputs() && (
        <LabelInput
          InputType="password"
          title="Password"
          inputedValue={password.current}
          sendValue={password}
        />
      )}

      {formState === "register" && (
        <LabelInput
          InputType="password"
          title="Re-enter passwrd"
          inputedValue={reEnter.current}
          sendValue={reEnter}
        />
      )}

      {/* socila media log in */}

      {showInputs() && (
        <div className=" w-full sm:w-1/2 h-20 flex flex-row items-center justify-center">
          <button
            className="flex flex-row w-fit md:w-50 cursor-pointer text-xs rounded-2xl text-black/40 m-2 p-2"
            type="button"
            onClick={handleGoogleAuthClick}
          >
            <Image
              className=" w-6 h-6 md:w-8 md:h-8"
              alt="Google Icon"
              src="/google-image.png"
              width={32}
              height={32}
              priority
            />
            <span className="m-2">Log in with google acc</span>
          </button>
        </div>
      )}

      {/* button logIn */}
      <div className="w-full flex flex-row justify-evenly">
        {formState === "logIn" && (
          <>
            <button
              className="text-black/40 text-shadow-lg self-start p-2 m-2 rounded-lg"
              type="submit"
            >
              LogIn
            </button>
            <button
              className="text-black/40 text-sm self-center p-2 m-2 cursor-pointer"
              type="button"
              onClick={() => setForm("reset")}
            >
              Forgot password
            </button>

            {/* reset btn */}
            <button
              className="text-sm text-black/50 self-end p-2 m-2 rounded-lg cursor-pointer"
              type="button"
              onClick={() => setForm("register")}
            >
              register an acc
            </button>
          </>
        )}

        {showInputs1() && (
          <>
            <button
              className="text-black self-start p-2 m-2 rounded-lg cursor-pointer"
              type="submit"
            >
              Submit
            </button>

            <button
              className="text-black self-start p-2 m-2 rounded-lg cursor-pointer"
              onClick={() => setForm("logIn")}
            >
              Back
            </button>
          </>
        )}
      </div>
    </form>
  );
}
