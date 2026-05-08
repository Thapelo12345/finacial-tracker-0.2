import { signOut } from "firebase/auth";
import { auth } from "../../../../firebase.config";
import store from "@/app/state management/store";
import { openCloseDialog } from "@/app/state management/slices/openCloseDialog";
import { selectDialog } from "@/app/state management/slices/selectDialog";
import { getMessage } from "@/app/state management/slices/dialogMessage";

type NavigateFunction = (path: string) => void;

export async function SignOut(navigate: NavigateFunction) {
  store.dispatch(selectDialog("load"));
  store.dispatch(openCloseDialog());

  signOut(auth)
    .then(() => {
      sessionStorage.clear();
      navigate("/");
      store.dispatch(getMessage("User logged out, Successfully"));
      store.dispatch(selectDialog("confirm"));

      setTimeout(() => {
        store.dispatch(openCloseDialog());
      }, 2000);
    })
    .catch((error) => {
      console.log(error);
      store.dispatch(getMessage(`Error : ${error}`));
      store.dispatch(selectDialog("error"));
    });
}
