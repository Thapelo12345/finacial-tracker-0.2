"use client";
import { useContext, useState, useEffect } from "react"; // Import useState and useEffect
import { SettingsContext } from "../context/settingsContext";
import UploadImages from "../components/dash/settingsInput/uploadImage";
import EditName from "../components/dash/settingsInput/editName";
import DeletAccount from "../components/dash/settingsInput/deleteAcc";

export default function SettingsContainer() {
  const settings = useContext(SettingsContext);
  const [windowWidth, setWindowWidth] = useState(0); // Initialize with 0

  useEffect(() => {
    // Check if window is defined (client-side)
    if (typeof window !== "undefined") {
      // Set initial width
      setWindowWidth(window.innerWidth);

      // Handler to call on window resize
      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []); // Empty array ensures effect runs only on mount and unmount

  return (
    <div
      className={`
    ${settings.currentValue === true ? "block" : "hidden"}
    absolute top-0 left-0 flex flex-col w-screen h-screen bg-black/70 z-20`}
    >
      <h1 className="text-white font-extrabold text-4xl text-center">
        Settings
      </h1>
      <div
        className={`w-[95%] md:w-100 duration-500 rounded-sm shadow-2xl h-auto bg-[whitesmoke] z-10 ${
          windowWidth > 768 ? "mt-40" : "mt-3" // Use state variable
        }`}
        style={{
          transform: settings.settingsInput
            ? windowWidth > 768 // Use state variable
              ? "translateX(200px)"
              : "translateX(10px)"
            : "translateX(-400px)",
        }}
      >
        {settings.clicked === "updateName" && <EditName />}
        {settings.clicked === "updateImage" && <UploadImages />}
        {settings.clicked === "delete" && <DeletAccount />}
      </div>
    </div>
  );
}