import Card from "../UI/Card/Card";
import Button from "../UI/Button/Button";
import classes from "./Home.module.css";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/user-slice";
import { Link } from "react-router-dom";

const Home = () => {
  const user = useSelector(selectUser);

  // user is authenticated
  if (user) {
    const dName = user.displayName === null ? "User" : user.displayName;

    return (
      <section>
        <h2>Welcome, {dName}!</h2>
      </section>
    );
  }

  // user !authenticated
  return (
    <section>
      <Card className={classes.home}>
        <h2>Sign Up</h2>
        <Link to="/auth">
          <Button>Register with Email and Password</Button>
        </Link>
      </Card>
      <div>
        <h3>Already have an account?</h3>
        <Link to="/auth">
          <Button>Log In</Button>
        </Link>
      </div>
    </section>
  );
};

export default Home;
