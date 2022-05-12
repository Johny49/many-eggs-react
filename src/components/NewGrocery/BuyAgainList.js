import Button from "../UI/Button/Button";
import classes from "./BuyAgainList.module.css";

const BuyAgainList = (props) => {
  if (props.items.length === 0) {
    return <h2>No Previous Purchases Found.</h2>;
  }

  const addToListHandler = (grocery) => {
    console.log(grocery);
    // set .isPurchased to false, .quantity to 1, update stored list
  };

  return (
    <>
      <h2>Previously Purchased Items:</h2>
      {/* <ul className={classes["purchased-list"]}> */}
      {props.items.map((grocery) => (
        <button
          key={grocery.id}
          className={classes["purchased-list"]}
          onClick={() => addToListHandler(grocery)}
        >
          {grocery.title}
        </button>
      ))}
    </>
  );
};

export default BuyAgainList;
