import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectUser } from "../../store/user-slice";
// components
import Groceries from "../Groceries/Groceries";
import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
// css
import classes from "./Home.module.css";

const Home = () => {
  const user = useSelector(selectUser);

  // user is authenticated
  if (user) {
    const dName = user.displayName === null ? "User" : user.displayName;

    return (
      <section className={classes.welcome}>
        <h2>Welcome, {dName}!</h2>
        <Groceries />
      </section>
    );
  }

  // user !authenticated
  return (
    <section>
      <Card className={classes.home}>
        <h2 className={classes["signup-Header"]}>Sign Up</h2>
        <Link to={{ pathname: "/signup" }}>
          <Button>Register with Email and Password</Button>
        </Link>
      </Card>
      <div>
        <h3 className={classes.login}>Already have an account?</h3>
        <Link to={{ pathname: "/login" }}>
          <Button>Log In</Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
