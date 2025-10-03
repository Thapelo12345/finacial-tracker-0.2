import { deleteUser } from "@firebase/auth";
import { db, auth } from "../../../../firebase.config";
import { deleteDoc, doc } from "firebase/firestore";
import store from "@/app/state management/store";
import { getMessage } from "@/app/state management/dialogMessage";
import { selectDialog } from "@/app/state management/selectDialog";
import { openCloseDialog } from "@/app/state management/openCloseDialog";

type NavigateFunction = (path: string) => void;

export default async function DeleteAccount(navigate: NavigateFunction) {
  const data = sessionStorage.getItem("currentUser");

  if (data) {
    const user = JSON.parse(data);
    store.dispatch(selectDialog("load"));
    store.dispatch(openCloseDialog());

    try {
        console.log(auth.currentUser)
      if (auth.currentUser) {
        await deleteUser(auth.currentUser).then(() => {
          deleteDoc(doc(db, "users", user.uid)).then(() => {
            store.dispatch(getMessage("User account deleted Successfully"));
            store.dispatch(selectDialog("confirm"));
            navigate("/");
            sessionStorage.clear();

            setTimeout(() => {
              store.dispatch(openCloseDialog());
            }, 2000);
          });
        });
      } else {
        throw new Error(
          "No authenticated user found. Please sign in to delete your account."
        );
      }
    } catch (error) {
      store.dispatch(getMessage("The was an Error, trying to deleting your account"));
      store.dispatch(selectDialog("error"));
      console.log(error);
    }
  }
}
