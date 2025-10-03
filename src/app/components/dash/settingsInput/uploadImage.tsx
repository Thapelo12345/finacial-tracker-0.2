"use client";

import SettingsHeader from "@/app/ui/settingsHeader/header";
import { UserIcon } from "@heroicons/react/20/solid";
import { useState, useRef } from "react";
import {
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitServerError,
  ImageKitUploadNetworkError,
  upload,
} from "@imagekit/next";

import { db } from "../../../../../firebase.config";
import { getDocs, collection, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { selectDialog } from "@/app/state management/selectDialog";
import { openCloseDialog } from "@/app/state management/openCloseDialog";
import { getMessage } from "@/app/state management/dialogMessage";
import { appUpdated } from "@/app/state management/UpdateAllComponents";

export default function UploadImages() {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const abortController = new AbortController();

  const authenticator = async () => {
    try {
      // Perform the request to the upload authentication endpoint.
      const response = await fetch("/api/imageAuth");

      if (!response.ok) {
        // If the server response is not successful, extract the error text for debugging.
        const errorText = await response.text();
        throw new Error(
          `Request failed with status ${response.status}: ${errorText}`
        );
      }

      // Parse and destructure the response JSON for upload credentials.
      const data = await response.json();
      const { signature, expire, token, publicKey } = data;
      return { signature, expire, token, publicKey };
    } catch (error) {
      // Log the original error for debugging before rethrowing a new error.
      console.error("Authentication error:", error);
      throw new Error("Authentication request failed");
    }
  }; //end of authenticator function

  const deleteImage = async (fieldId: string) => {
    if (fieldId === "") {
      return "procced";
    } else {
      const deletion = await fetch(`/api/imageDelete?fieldId=${fieldId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return deletion.status === 200 ? "success" : "failed";
    }
  };

  const handleUpload = async () => {
    // Access the file input element using the ref
    dispatch(selectDialog("load"));
    dispatch(openCloseDialog());

    const fileInput = fileInputRef.current;
    if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
      dispatch(getMessage("Please select a file to upload"));
      dispatch(selectDialog("error"));
      return;
    }

    // Extract the first file f rom the file input
    const file = fileInput.files[0];

    // Retrieve authentication parameters for the upload.
    let authParams;
    try {
      authParams = await authenticator();
    } catch (authError) {
      console.error("Failed to authenticate for upload:", authError);
      dispatch(getMessage("Failed to authenticate for upload"));
      dispatch(selectDialog("error"));
      return;
    }
    const { signature, expire, token, publicKey } = authParams;

    // Call the ImageKit SDK upload function with the required parameters and callbacks.
    try {
      const data = sessionStorage.getItem("currentUser");
      if (!data) {
        throw new Error("use Credentials not found");
      }
      const user = JSON.parse(data);

      const validate = await deleteImage(user.imageId);

      console.log(validate)
      if (validate === "procced" || validate === "success") {
        const uploadResponse = await upload({
          // Authentication parameters
          expire,
          token,
          signature,
          publicKey,
          file,
          fileName: file.name, // Optionally set a custom file name
          folder: "/Expense_tracker_profile_images",
          onProgress: (event) => {
            setProgress((event.loaded / event.total) * 100);
          },
          // Abort signal to allow cancellation of the upload if needed.
          abortSignal: abortController.signal,
        });

        const getDocuments = await getDocs(collection(db, "users"));
        const matchUser = getDocuments.docs.find(
          (doc) => doc.data().email === user.email
        );

        if (!matchUser) {
          throw new Error("The is No data on the database");
        }

        await updateDoc(matchUser.ref, {
          avatar: uploadResponse.url,
          imageId: uploadResponse.fileId,
        }).then(() => {
          user.avatar = uploadResponse.url;
          user.imageId = uploadResponse.fileId;
          sessionStorage.setItem("currentUser", JSON.stringify(user));

          dispatch(getMessage("Image uploaded successfully"));
          dispatch(selectDialog("confirm"));
          dispatch(appUpdated());
          setTimeout(() => {
            dispatch(openCloseDialog());
          }, 1001);
        });
      } //end of valid if
      else {
        user.avatar = ""
        sessionStorage.setItem("currentUser", JSON.stringify(user))
        dispatch(getMessage("Network Error. Please Try again"))
        dispatch(selectDialog("error"))
      }
    } catch (error) {
      // Handle specific error types provided by the ImageKit SDK.
      if (error instanceof ImageKitAbortError) {
        console.error("Upload aborted:", error.reason);
        dispatch(getMessage("Upload aborted"));
      } else if (error instanceof ImageKitInvalidRequestError) {
        console.error("Invalid request:", error.message);
        dispatch(getMessage("Invalid request"));
      } else if (error instanceof ImageKitUploadNetworkError) {
        console.error("Network error:", error.message);
        dispatch(getMessage("Network error"));
      } else if (error instanceof ImageKitServerError) {
        console.error("Server error:", error.message);
        dispatch(getMessage("Server error"));
      } else {
        // Handle any other errors that may occur.
        console.error("Upload error:", error);
        dispatch(getMessage("Upload error:"));
      }
      dispatch(selectDialog("error"));
    }
  };

  return (
    <div className="flex flex-col border-4 border-black/20 items-center w-full h-full bg-[whitesmoke] rounded-sm p-2">
      <SettingsHeader title={"upload An image"} />

      <div className="flex items-center justify-center w-1/2">
        <UserIcon className="text-black/20 w-10 md:w-16 h-10 md:h-16" />
      </div>

      {/* File input element using React ref */}

      <input
        className="p-1 text-xs w-fit md:text-sm text-black/40 outline-0 rounded-sm"
        type="file"
        ref={fileInputRef}
        accept="image/*"
        required
        style={{
          boxShadow: "inset 1px 1px 5px black, inset -2px -2px 5px white",
        }}
      />
      {/* Button to trigger the upload process */}
      <button type="button" onClick={handleUpload}>
        Upload file
      </button>
      <br />
      {/* Display the current upload progress */}
      <progress className="bg-blue-500" value={progress} max={100}></progress>
    </div>
  );
}
