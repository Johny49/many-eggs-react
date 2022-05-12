import { useDispatch } from "react-redux";
import { groceryActions, selectGroceryItems } from "../../store/grocery-slice";
import Button from "../UI/Button/Button";
import classes from "./BuyAgainList.module.css";

const BuyAgainList = (props) => {
  const dispatch = useDispatch();

  if (props.items.length === 0) {
    return <h2>No Previous Purchases Found.</h2>;
  }

  const addToListHandler = (buyAgainItem) => {
    console.log(buyAgainItem);
    // dispatch to store, set .isPurchased to false, .quantity to 1
    dispatch(groceryActions.buyItemAgain(buyAgainItem));
  };

  return (
    <>
      <h2>Previously Purchased Items:</h2>
      {/* <ul className={classes["purchased-list"]}> */}
      {props.items.map((grocery) => (
        <Button
          key={grocery.id}
          className={classes["purchased-list"]}
          onClick={() => addToListHandler(grocery)}
        >
          {grocery.title}
        </Button>
      ))}
    </>
  );
};

export default BuyAgainList;
