import { auth } from "../../../../firebase.config";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";
import { getMessage } from "@/app/state management/slices/dialogMessage";
import { openCloseDialog } from "@/app/state management/slices/openCloseDialog";
import { selectDialog } from "@/app/state management/slices/selectDialog";
import store from "@/app/state management/store";

export function changingPassword(p1: string, p2: string) {
  store.dispatch(selectDialog("load"));
  store.dispatch(openCloseDialog());

  try {
    const data = sessionStorage.getItem("currentUser");
    if (!data) {
      throw new Error("user data not found");
    }

    const user = JSON.parse(data);
    const authUser = auth.currentUser;

    if (!authUser) {
      throw new Error("No user found");
    }

    const credential = EmailAuthProvider.credential(user.email, p1);

    reauthenticateWithCredential(authUser, credential)
      .then(() => {
        updatePassword(authUser, p2)
          .then(() => {
            store.dispatch(getMessage("Password updated successfully"));
            store.dispatch(selectDialog("confirm"));

            setTimeout(() => {
              store.dispatch(openCloseDialog());
            }, 5000);
          })
          .catch((error) => {
            console.log(error);
            throw new Error("Password update failed");
          });
      })
      .catch((error) => {
        console.log(error);
        throw new Error("Reauthentication failed");
      });
  } catch (error) {
    console.log(error);
    store.dispatch(getMessage(`Error: ${error}`));
    store.dispatch(selectDialog("error"));
  }
}
