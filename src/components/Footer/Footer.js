import logoImg from "../../assets/header-logo.png";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={classes["footer--pin"]}>
      <img
        className={classes["footer-image"]}
        src={logoImg}
        alt={"A shopping cart filled with eggs"}
      />
      <h2>
        {`\u00a9`} {new Date().getFullYear()} Geoffrey Johnson
      </h2>
    </footer>
  );
};

export default Footer;
