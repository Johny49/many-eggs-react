import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { auth } from "../../config/firebase-config";
import { logout, selectUser } from "../../store/user-slice";
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  const location = useLocation();

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // dispatch store logout action
    dispatch(logout());
    // Firebase sign out
    auth.signOut();
  };

  return (
    <nav className={classes.nav}>
      {user && location.pathname !== "/profile" && (
        <Link to="/profile">
          <button type="button">Profile</button>
        </Link>
      )}
      {user && location.pathname !== "/" && (
        <Link to="/">
          <button type="button">Groceries</button>
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
