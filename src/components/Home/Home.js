import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user-slice";
import { Link } from "react-router-dom";
import Groceries from "../Groceries/Groceries";

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
        <h2>Sign Up</h2>
        <Link to={{ pathname: "/auth", state: { isLogin: false } }}>
          <Button>Register with Email and Password</Button>
        </Link>
      </Card>
      <div>
        <h3>Already have an account?</h3>
        <Link to={{ pathname: "/auth", state: { isLogin: true } }}>
          <Button>Log In</Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
