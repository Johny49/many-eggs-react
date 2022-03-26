import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { logout, selectUser } from "../../store/user-slice";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(window.location.href); // TODO work with this

  const logoutHandler = () => {
    // dispatch store logout action
    dispatch(logout());
    // Firebase sign out
    auth.signOut();
  };

  return (
    <nav className={classes.nav}>
      {!user && (
        <Link to="/auth">
          <button type="button">Sign Up</button>
        </Link>
      )}
      {user && (
        <Link to="/profile">
          <button type="button">Profile</button>
        </Link>
      )}
      {user && (
        <button type="button" onClick={logoutHandler}>
          Logout
        </button>
      )}
    </nav>
  );
};

export default Navigation;
