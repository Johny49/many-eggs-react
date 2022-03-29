import { useDispatch } from "react-redux";
import { groceryActions } from "../../store/grocery-slice";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import classes from "./GroceryItem.module.css";

const GroceryItem = (props) => {
  const dispatch = useDispatch();

  const addItemHandler = () => {
    dispatch(groceryActions.addItemToList({ title: props.title, quantity: 1 }));
  };

  const subtractItemHandler = () => {
    dispatch(groceryActions.removeItemFromList({ id: props.id, quantity: 1 }));
  };

  const deleteItemHandler = () => {
    dispatch(
      groceryActions.removeItemFromList({
        id: props.id,
        quantity: props.quantity,
      })
    );
  };

  const markItemPurchasedHandler = () => {
    dispatch(groceryActions.markItemPurchased({ id: props.id }));
  };

  return (
    <li>
      <Card className={classes["grocery-item"]}>
        <div className={classes["grocery-item__description"]}>
          <Button
            className={classes["button-qty"]}
            onClick={subtractItemHandler}
          >
            -
          </Button>
          <div className={classes["grocery-item__qty"]}>{props.quantity}</div>
          <Button className={classes["button-qty"]} onClick={addItemHandler}>
            +
          </Button>
          <h2>{props.title}</h2>
        </div>
        <div className={classes.actions}>
          <Button
            className={classes["button-purchased"]}
            onClick={markItemPurchasedHandler}
          >
            Purchased
          </Button>
          <Button
            className={classes["button-delete"]}
            onClick={deleteItemHandler}
          >
            Delete
          </Button>
        </div>
      </Card>
    </li>
  );
};

export default GroceryItem;
