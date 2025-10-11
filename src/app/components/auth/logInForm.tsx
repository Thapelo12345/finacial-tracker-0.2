"use client";

import { UserCircleIcon } from "@heroicons/react/20/solid";
import LabelInput from "@/app/ui/logInForm/labelInput";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { handleGooglAthentication } from "@/app/functions/authFunctions/googleLogIn";
import EmailAuthentication from "@/app/functions/authFunctions/emailLogIn";
import gsap from "gsap";
import { useRouter } from "next/navigation";
import Image from "next/image";
// import { useNavigate } from "react-router-dom";

export default function AuthenticationForm() {
  const navigate = useRouter();

  const [formState, setForm] = useState("logIn");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [reEnter, setReEnter] = useState("");

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
        
        EmailAuthentication({
          registerLogIn: formState,
          email,
          password,
          reEnterPassword: reEnter,
          userName: username,
          NavigateFunction: navigate.push,
        });
        if(formState === "register"){
          setForm("logIn")
        }
      }}
      id="formAnimation"
      className="backface-hidden bg-[whitesmoke] shadow-2xl shadow-black flex flex-col items-center rounded-lg justify-center border-2 border-white w-full sm:w-1/2 p-2 m-2"
    >
      <UserCircleIcon className="w-30 h-20 text-black/50" />

      {formState === "register" && (
        <LabelInput
          InputType="text"
          title="Usename"
          inputedValue={username}
          sendValue={setUsername}
        />
      )}

      <LabelInput
        InputType="email"
        title="Email"
        inputedValue={email}
        sendValue={setEmail}
      />

      <LabelInput
        InputType="password"
        title="Password"
        inputedValue={password}
        sendValue={setPassword}
      />

      {formState === "register" && (
        <LabelInput
          InputType="password"
          title="Re-enter passwrd"
          inputedValue={reEnter}
          sendValue={setReEnter}
        />
      )}

      {/* socila media log in */}

      <div className="w-1/2 h-20 flex flex-row items-center justify-center">
        <button
          className=" flex flex-row w-50 cursor-pointer text-xs rounded-lg text-black m-2 p-2"
          type="button"
          onClick={handleGoogleAuthClick}
        >
          <Image
            className="w-8 h-8"
            alt="Google Icon"
            src="/google-image.png"
            width={32}
            height={32}
            priority
          />
          <span className="m-2 text-xs">Log in with google acc</span>
        </button>
      </div>

      {/* button logIn */}
      <div className="w-full flex flex-row justify-evenly">
        {formState === "logIn" && (
          <>
            <button
              className="text-black self-start p-2 m-2 rounded-lg"
              type="submit"
            >
              LogIn
            </button>
            <button className="text-black text-xs self-center p-2 m-2">
              Forgot password
            </button>

            {/* reset btn */}
            <button
              className="text-xs text-black self-end p-2 m-2 rounded-lg"
              type="button"
              onClick={() => setForm("register")}
            >
              register an acc
            </button>
          </>
        )}

        {formState === "register" && (
          <>
            <button
              className="text-black self-start p-2 m-2 rounded-lg"
              type="submit"
            >
              Submit
            </button>

            <button
              className="text-black self-start p-2 m-2 rounded-lg"
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
