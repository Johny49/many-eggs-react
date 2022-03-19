import { useContext } from "react";
// import authcontext from store
import classes from "./Navigation.module.css";

const Navigation = (props) => {
  // const authCtx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <button type="button">Sign Up</button>
    </nav>
  );
};

export default Navigation;
