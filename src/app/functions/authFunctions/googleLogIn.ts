import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../../../firebase.config";
import { addDoc } from "firebase/firestore";
import { collection, query, where, getDocs } from "firebase/firestore";
import store from "../../state management/store";
import { selectDialog } from "../../state management/slices/selectDialog";
import { getMessage } from "../../state management/slices/dialogMessage";
import { openCloseDialog } from "../../state management/slices/openCloseDialog";

const googleProvider = new GoogleAuthProvider();

interface user {
  id: string;
  avatar: string;
  imageId: string;
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

type NavigateFunction = (path: string) => void;

export async function handleGooglAthentication(navigate: NavigateFunction) {
  try {
    store.dispatch(selectDialog("load"));
    store.dispatch(openCloseDialog());

    const result = await signInWithPopup(auth, googleProvider);

    const userExist = query(
      collection(db, "users"),
      where("id", "==", result.user.uid),
    );

    const snapshot = await getDocs(userExist);

    if (snapshot.empty) {
      const newUser: user = {
        id: result.user.uid,
        avatar: result.user.photoURL || "",
        imageId: "",
        name: result.user.displayName || "",
        email: result.user.email || "",
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

      await addDoc(collection(db, "users"), newUser);
      sessionStorage.setItem("currentUser", JSON.stringify(newUser));
    } //end of if
    else {
      const userData = snapshot.docs[0].data();
      sessionStorage.setItem("currentUser", JSON.stringify(userData));
    }

    store.dispatch(selectDialog("confirm"));
    store.dispatch(
      getMessage(
        "Congratulations! You have successfully logged into your account",
      ),
    );
    navigate("/expenseApp/dashBoard");

    setTimeout(() => {
      store.dispatch(selectDialog("load"));
    }, 5000);

    setTimeout(() => {
      store.dispatch(openCloseDialog());
    }, 7000);
  } catch (error) {
    console.log(error);
    store.dispatch(openCloseDialog());
    alert(error);
  }
} //end of google auth function
