import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { auth, onAuthStateChanged } from "./config/firebase-config";
import { login, logout, selectUser } from "./store/user-slice";
// components and pages
import MainHeader from "./components/MainHeader/MainHeader";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import ProfilePage from "./pages/ProfilePage";
import Footer from "./components/Footer/Footer";

import classes from "./App.module.css";

function App() {
  const dispatch = useDispatch();

  // check if user is already authenticated
  useEffect(() => {
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
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

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
