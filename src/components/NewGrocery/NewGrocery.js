import { useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { groceryActions } from "../../store/grocery-slice";
import classes from "./NewGrocery.module.css";

const NewGrocery = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredQty, setEnteredQty] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [showBuyAgain, setShowBuyAgain] = useState(false);

  const dispatch = useDispatch();

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const buyAgainHandler = () => {
    // TODO: display/hide list of prev. purchased items
    setShowBuyAgain((prevState) => !prevState);
  };

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const qtyChangeHandler = (e) => {
    setEnteredQty(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const groceryItem = {
      id: uuidv4(),
      title: enteredTitle,
      quantity: +enteredQty,
      isPurchased: false,
    };
    // dispatch to store
    dispatch(groceryActions.addItemToList(groceryItem));

    setEnteredTitle("");
    setEnteredQty("");
    setIsEditing(false);
  };

  return (
    <div className={classes["new-grocery"]}>
      {!isEditing && <button onClick={startEditingHandler}>Add Grocery</button>}
      {isEditing && (
        <form onSubmit={submitHandler}>
          <div className={classes["new-expense__controls"]}>
            <div className={classes["new-expense__control"]}>
              <label>Title</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className={classes["new-expense__control"]}>
              <label>Amount</label>
              <input
                type="number"
                value={enteredQty}
                min="1"
                step="1"
                max="99"
                onChange={qtyChangeHandler}
              />
            </div>
          </div>
          <div className={classes["new-expense__actions"]}>
            <button type="button" onClick={stopEditingHandler}>
              Cancel
            </button>
            <button type="submit">Add Grocery</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default NewGrocery;
