import { auth } from "../../../../firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import store from "@/app/state management/store";
import { selectDialog } from "@/app/state management/slices/selectDialog";
import { openCloseDialog } from "@/app/state management/slices/openCloseDialog";
import { getMessage } from "@/app/state management/slices/dialogMessage";

export async function ResetPassword(emailAddress: string) {
  store.dispatch(selectDialog("load"));
  store.dispatch(openCloseDialog());

  sendPasswordResetEmail(auth, emailAddress)
    .then(() => {
      store.dispatch(
        getMessage(
          "Reset link has been sent to your email address. if not in inbox check spam",
        ),
      );
      store.dispatch(selectDialog("confirm"));

      setTimeout(() => {
        store.dispatch(openCloseDialog());
      }, 5000);
    })
    .catch((error) => {
      console.log(error);
      store.dispatch(getMessage("Faild to reset password"));
      store.dispatch(selectDialog("error"));
    });
}
