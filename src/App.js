import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  onAuthStateChanged,
  db,
  set,
  ref,
  onValue,
} from "./config/firebase-config";
import { login, logout } from "./store/user-slice";
import {
  groceryActions,
  selectGroceriesChanged,
  selectGroceryItems,
} from "./store/grocery-slice";
// components and pages
import MainHeader from "./components/MainHeader/MainHeader";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer/Footer";
// css
import classes from "./App.module.css";

// track inital load of app
let isInitial = true;

function App() {
  const groceryItems = useSelector(selectGroceryItems);
  const groceriesChanged = useSelector(selectGroceriesChanged);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchGroceries = (userId) => {
      const groceryListRef = ref(db, `lists/${userId}`);
      onValue(groceryListRef, (snapshot) => {
        const groceryData = snapshot.val();
        dispatch(groceryActions.replaceGroceryList(groceryData));
      });
    };

    // check if user is already authenticated
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user logged in, store current user in state
        dispatch(
          login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
          })
        );
        //retrieve list for authenticated user
        fetchGroceries(userAuth.uid);
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  useEffect(() => {
    // first load of app
    if (isInitial) {
      isInitial = false;
      return;
    }
    // update list in db when changed; skip on initial load
    if (groceriesChanged) {
      set(ref(db, "lists/" + auth.currentUser.uid), {
        groceryItems,
      })
        .then(() => {
          console.log("data saved successfully!");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [groceryItems, groceriesChanged]);

  return (
    <div className="App">
      <MainHeader />
      <main className={classes["content-container"]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
