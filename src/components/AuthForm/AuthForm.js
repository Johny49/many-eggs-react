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

import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";

const AuthForm = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputref = useRef();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [isLogin, setIsLogIn] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  // toggle login or signup
  const switchAuthModeHandler = () => {
    setIsLogIn((prevState) => !prevState);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputref.current.value;

    // TODO: Add validation here

    setIsLoading(true);

    if (isLogin) {
      // handle user login
      signInWithEmailAndPassword(auth, enteredEmail, enteredPassword)
        .then((userAuth) => {
          // Signed in
          const user = userAuth.user;
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
          // Signed in
          const user = userAuth.user;
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
    <Card>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className="mb-3">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              placeholder="Display Name"
              ref={nameInputRef}
              required
            />
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            ref={passwordInputref}
            placeholder="Password"
            minLength={7}
            required
          />
        </div>
        <div>
          {!isLoading && (
            <Button type="submit">
              {isLogin ? "Login" : "Create Account"}
            </Button>
          )}
          {isLoading && <p>Sending authentication request ...</p>}
          <Button type="button" onClick={switchAuthModeHandler}>
            {isLogin ? "Create New Account" : "Log In With Existing Account"}
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default AuthForm;
