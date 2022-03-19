import Navigation from "./Navigation";
import logoImg from "../../assets/header-logo.png";
import classes from "./MainHeader.module.css";

const MainHeader = (props) => {
  return (
    <header className={classes["main-header"]}>
      <img
        className={classes["main-image"]}
        src={logoImg}
        alt={"A shopping cart filled with eggs"}
      />
      <h1 className="text-light">Many Eggs, One Basket</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
