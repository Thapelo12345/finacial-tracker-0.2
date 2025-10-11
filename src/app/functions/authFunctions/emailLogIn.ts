import store from "../../state management/store";
import { openCloseDialog } from "../../state management/openCloseDialog";
import { selectDialog } from "../../state management/selectDialog";
import { getMessage } from "../../state management/dialogMessage";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../../firebase.config";
import { getDocs } from "firebase/firestore";
import { query, where } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";

type Props = {
  registerLogIn: string;
  email: string;
  password: string;
  reEnterPassword: string;
  userName: string;
  NavigateFunction: (path: string) => void;
};

interface user {
  id: string;
  avatar: string;
  name: string;
  email: string;
  budgetAmount: number;
  income: number;
  transactionTotal: number;
  transactionExpense: number;
  budgetExpense: number;
  budgetSurplus: number;
  budgetExpenses: [];
  giftCard: number;
  savings: number;
  vouchers: number;
  potsValue: number;
  pots: [];
  transactions: [];
  recurringBills: [];
}

export default async function EmailAuthentication({
  registerLogIn,
  email,
  password,
  reEnterPassword,
  userName,
  NavigateFunction: navigate,
}: Props) {
  if (registerLogIn === "register") {
    if (reEnterPassword !== password) {
      store.dispatch(getMessage("Your Password do not match"));
      store.dispatch(selectDialog("error"));
      store.dispatch(openCloseDialog());
    }
    // end of if statement
    else {
      store.dispatch(selectDialog("load"));
      store.dispatch(openCloseDialog());

      try {
        const usersCollection = collection(db, "users");

        // Then execute the query:
        const querySnapshot2 = await getDocs(
          query(usersCollection, where("email", "==", email))
        );

        if (querySnapshot2.empty) {
          const createNewUser = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          if (createNewUser) {
            const newUser: user = {
              id: createNewUser.user.uid,
              avatar: "",
              name: userName,
              email: email,
              budgetAmount: 0,
              income: 0,
              transactionTotal: 0,
              transactionExpense: 0,
              budgetExpense: 0,
              budgetSurplus: 0,
              budgetExpenses: [],
              giftCard: 0,
              savings: 0,
              vouchers: 0,
              potsValue: 0,
              pots: [],
              transactions: [],
              recurringBills: [],
            };

            const finalUser = await addDoc(collection(db, "users"), newUser);
            // const userDoc = await getDoc(doc(db, "users", userId));
            
            if (finalUser) {
              store.dispatch(selectDialog("confirm"));
              store.dispatch(getMessage("Your Account has been created"));
              navigate("/");
              setTimeout(() => {
                store.dispatch(openCloseDialog());
              }, 1500);
            }
            sessionStorage.setItem("currentUser", JSON.stringify(newUser));
          } //end of inner if
        } else {
          store.dispatch(selectDialog("error"));
          store.dispatch(getMessage("Sorry This user Already Exist's"));
        }
      } catch (error) {
        store.dispatch(selectDialog("error"));
        store.dispatch(
          getMessage("Sorry Something wrong with you credentails")
        );
        alert(error);
        store.dispatch(openCloseDialog());
      }
    }
  } //end of register
  else {
    store.dispatch(selectDialog("load"));
    store.dispatch(openCloseDialog());
    try {
      const userSignIn = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userSignIn.user) {
        const searchUser = query(
          collection(db, "users"),
          where("email", "==", email)
        );
        const snap = await getDocs(searchUser);

        if (!snap.empty) {
          const userData = snap.docs[0].data();
          sessionStorage.setItem("currentUser", JSON.stringify(userData));

          store.dispatch(
            getMessage(
              "Congratulation you have successfully LoggedIn to your acount"
            )
          );
          store.dispatch(selectDialog("confirm"));
          navigate("/expenseApp/dashBoard");

          setTimeout(() => {
            store.dispatch(openCloseDialog());
          }, 3000);
        } //end of snap if
        else {
          store.dispatch(
            getMessage("Sorry the is no user With Such credentials")
          );
          store.dispatch(selectDialog("error"));
        } //end of snap else
      }
    } catch (error) {
      console.log(error);
      store.dispatch(getMessage("Invalid credentials, please try again"));
      store.dispatch(selectDialog("error"));
    }
  } //end of logIn
}
