import { deleteUser } from "@firebase/auth";
import { db, auth } from "../../../../firebase.config";
import { collection, deleteDoc, doc, getDocs, query, where } from "firebase/firestore";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "@firebase/auth";
import store from "@/app/state management/store";
import { getMessage } from "@/app/state management/dialogMessage";
import { selectDialog } from "@/app/state management/selectDialog";
import { openCloseDialog } from "@/app/state management/openCloseDialog";
import type { User } from "@firebase/auth";
import { onAuthStateChanged } from "firebase/auth";

type NavigateFunction = (path: string) => void;


let newPassword: string | undefined;
let validate: string | undefined;

function requiresReauth(user: User) {
  // Firebase typically requires reauth after 5 minutes
  const REAUTH_WINDOW_MS = 5 * 60 * 1000; // 5 minutes

  if (!user.metadata.lastSignInTime) return true;

  const lastSignIn = new Date(user.metadata.lastSignInTime).getTime();
  const now = Date.now();
  const timeSinceLastAuth = now - lastSignIn;

  return timeSinceLastAuth > REAUTH_WINDOW_MS;
}

async function waitForUser(): Promise<User> {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        unsubscribe(); // stop listening
        resolve(user); // return the user
      }
    });
  });
}

const inputsRecieved = ()=>{return new Promise((resolve)=>{if(validate !== undefined && newPassword !== undefined){resolve("credentials recieved")}})}
//of test re-auth

async function getPassword(verdict: string, password: string) {
  store.dispatch(selectDialog("load"));

  newPassword = password;
  validate = verdict;
}

async function DeleteAccount(navigate: NavigateFunction) {
  store.dispatch(selectDialog("load"));
  store.dispatch(openCloseDialog());

  try {
    const data = sessionStorage.getItem("currentUser");

    if (!data) {
      throw new Error("user credentials not found");
    }
    const user1 = JSON.parse(data);

    //first checker user log in register
    
    // const userAuth = await new Promise<User | null>((resolve) => {
    //   const unsubscribe = onAuthStateChanged(auth, (user) => {
    //     unsubscribe(); // Remove listener after first invocation
    //     resolve(user as User | null);
    //   });
    // }); 

    const userAuth = await waitForUser()
    console.log(userAuth)
    if (!userAuth) {throw new Error("No authenticated user found");}
    if (requiresReauth(userAuth)) {
      store.dispatch(selectDialog("deletePassword"));
     await inputsRecieved()

     if(validate === "cancel"){
      store.dispatch(getMessage("Thanks for stay with us"))
      store.dispatch(selectDialog("confirm"))
      setTimeout(()=>{store.dispatch(openCloseDialog())}, 2000)
     }//end of outer if
     else{
      if(newPassword === "" && undefined){
        store.dispatch(getMessage("You have'nt enter your password"))
        store.dispatch(selectDialog("error"))
      }//end of inner if

      else{
        const credential = EmailAuthProvider.credential(user1.email, newPassword ?? "");
        await reauthenticateWithCredential(userAuth, credential);
      }//end of inner else
     }//end of outer else
      
    }//end of requiresReAuth if

    // await user1.delete()
    await userAuth.delete()
    console.log("user auth deleted")

    await fetch(`/api/imageDelete?fieldId=${user1.imageId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
  });
  console.log("user image deleted\n")

  const userDoc = query(collection(db, "users"), where("email", "==", user1.email))
  const querySnapshot = await getDocs(userDoc)

  if(querySnapshot.empty){throw new Error("No user found")}

  const userId = querySnapshot.docs[0]

await deleteDoc(doc(db, "users", userId.id));
console.log("user data base deleted")

store.dispatch(getMessage("Your account has been successfully deleted. Thank you for being with us"))
store.dispatch(selectDialog("confirm"))
setTimeout(()=>{store.dispatch(openCloseDialog())}, 3000)
navigate("/")

  } catch (error) {
    //end of try
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message: string }).message
        : String(error);
    store.dispatch(getMessage(`Error: ${errorMessage}`));
    store.dispatch(selectDialog("error"));
  } //end of catch
} //end of delete account function

// async function DeleteAccount(navigate: NavigateFunction) {
//   let wayForward = "stand by";

//   store.dispatch(selectDialog("load"));
//   store.dispatch(openCloseDialog());

//   const data = sessionStorage.getItem("currentUser");

//   if (data) {
//     const user = JSON.parse(data);

//     try {
//       const deleteDataBase = setInterval(async () => {
//         console.log(wayForward)
//         if (wayForward === "move on") {

//           //start  deleting in firestore data base

//           await fetch(`/api/imageDelete?fieldId=${user.imageId}`, {
//             method: "DELETE",
//             headers: {
//               "Content-Type": "application/json",
//             },
//           });

//           await deleteDoc(doc(db, "users", user.uid))
//             .then(() => {
//               navigate("/");
//               sessionStorage.clear();
//               store.dispatch(
//                 getMessage(
//                   "Your account has been successfully deleted. Thank you for being with us"
//                 )
//               );
//               store.dispatch(selectDialog("confirm"));
//               setTimeout(() => {
//                 store.dispatch(openCloseDialog());
//               }, 5000);
//             })
//             .catch((error) => {
//               console.log(error);
//               throw new Error("Failed to delete user database");
//             });

//           clearInterval(deleteDataBase);
//         } else if (wayForward === "stop") {
//           clearInterval(deleteDataBase);
//           store.dispatch(getMessage("Failed to delete Account please contact admin"));
//           store.dispatch(selectDialog("error"))
//         }
//       }, 1000);

//       const userAuth = auth.currentUser;

//       if (userAuth && requiresReauth(userAuth)) {
//         console.log("line 94")
//         store.dispatch(selectDialog("deletePassword"));

//         const waitingForUser = setInterval(async () => {
//           if (validate !== undefined && newPassword !== undefined) {
//             if (validate === "cancel") {
//               store.dispatch(getMessage("So you have decided to stay with us"));
//               store.dispatch(selectDialog("confirm"));
//               setTimeout(() => {
//                 store.dispatch(openCloseDialog());
//               }, 2000);
//               wayForward = "stop";
//             } else if (validate === "delete" && newPassword === "") {
//               wayForward = "stop";
//               throw new Error("Sorry you have not Entered your password");
//             } else if (validate === "delete" && newPassword !== "") {
//               const credential = EmailAuthProvider.credential(
//                 user.email,
//                 newPassword
//               );
//               await reauthenticateWithCredential(user, credential);
//               await userAuth.delete().then(() => (wayForward = "move on"));
//             }
//             clearInterval(waitingForUser);
//           }
//         }, 1000);
//       } //end of if user long authentication
//       else {
//        if(userAuth !== null){
//         console.log("userAuth is not null")
//          await userAuth.delete().then(() => {
//             console.log("runing userAuth delete")
//             wayForward = "move on";
//           })
//           .catch((error) => {
//             console.log(error);
//             throw new Error("Failed to delete acoount");
//           });
//        }//end if not null
//        else{
//         wayForward = "stop"
//        }

//       } //end of else user long authentication
//     } catch (error) {
//       //end of try
//       // wayForward = "stop";
//       store.dispatch(getMessage(`Error: ${error}`));
//       store.dispatch(selectDialog("error"))
//     } //end of catch
//   } //end of outer if
//   else {
//     store.dispatch(getMessage("User credentials not found"));
//     store.dispatch(selectDialog("error"));
//   } //end of the outer else
// } //end of delete account function

export { getPassword, DeleteAccount };
