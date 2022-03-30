import { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "../../config/firebase-config";
import { login, selectUser } from "../../store/user-slice";
// component
import Button from "../UI/Button/Button";
// css
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputref = useRef();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isLogin, setIsLogIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // toggle login or signup
  const switchAuthModeHandler = () => {
    setIsLogIn((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value.trim();
    const enteredPassword = passwordInputref.current.value.trim();

    setIsLoading(true);

    if (isLogin) {
      // handle user login
      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userAuth) => {
          // Signed in, finished loading
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    } else {
      const enteredName = nameInputRef.current.value;
      // handle user signup
      createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword,
        enteredName
      )
        .then((userAuth) => {
          // add display name to new user
          updateProfile(userAuth.user, {
            displayName: enteredName,
          }).then(
            // dispatch to state
            dispatch(
              login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: enteredName,
              })
            )
          );
          // signed in, finished loading
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          alert(error.message);
        });
    }
  };

  if (user) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className={classes.auth}>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form id="login" onSubmit={submitHandler}>
        {!isLogin && (
          <div className={classes.control}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Display Name"
              ref={nameInputRef}
              required
              autoComplete="nickname"
            />
          </div>
        )}

        <div className={classes.control}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
            autoComplete="username"
          />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputref}
            placeholder="Password"
            minLength={7}
            required
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <Button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          {isLoading && <p>Sending authentication request ...</p>}
          <Button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create New Account" : "Log In With Existing Account"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AuthForm;
