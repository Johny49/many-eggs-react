import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { groceryActions, selectGroceryItems } from "../../store/grocery-slice";
import validateString from "../../utils/validateString";
import BuyAgainList from "./BuyAgainList";
import Button from "../UI/Button/Button";
import classes from "./NewGrocery.module.css";

const createGroceryId = () => {
  if (window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};

const NewGrocery = () => {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [enteredQty, setEnteredQty] = useState("1");
  // control display of new Grocery Item Form
  const [isEditing, setIsEditing] = useState(false);
  // control display of Previous Purchases
  const [showBuyAgain, setShowBuyAgain] = useState(false);
  const prevPurchasedItems = useSelector(selectGroceryItems).filter(
    (item) => item.isPurchased
  );

  const dispatch = useDispatch();

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  };

  const buyAgainHandler = () => {
    setShowBuyAgain(true);
  };

  const closeBuyAgainHandler = () => {
    setShowBuyAgain(false);
  };

  const titleChangeHandler = (e) => {
    setEnteredTitle(e.target.value);
  };

  const qtyChangeHandler = (e) => {
    setEnteredQty(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // ensure title is not blank before saving
    if (!validateString(enteredTitle)) {
      alert("Title cannot be blank");
      return;
    }

    const groceryItem = {
      id: createGroceryId(),
      title: enteredTitle.toLowerCase(),
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
      {!isEditing && !showBuyAgain && (
        <Button onClick={startEditingHandler}>Add Grocery</Button>
      )}
      {!showBuyAgain && !isEditing && (
        <Button onClick={buyAgainHandler}>Buy Again</Button>
      )}
      {/* Add New Grocery Item */}
      {isEditing && (
        <form onSubmit={submitHandler}>
          <div className={classes["new-grocery__controls"]}>
            <div className={classes["new-grocery__control"]}>
              <label>Title</label>
              <input
                type="text"
                value={enteredTitle}
                onChange={titleChangeHandler}
              />
            </div>
            <div className={classes["new-grocery__control"]}>
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
          <div className={classes["new-grocery__actions"]}>
            <Button onClick={stopEditingHandler}>Cancel</Button>
            <Button type="submit">Add Grocery</Button>
          </div>
        </form>
      )}
      {/* Display List of Previous Purchases */}
      {showBuyAgain && (
        <>
          <div className={classes["buy-again-scroll-box"]}>
            <BuyAgainList items={prevPurchasedItems} />
          </div>
          <hr className={classes.separator} />
          <Button onClick={closeBuyAgainHandler}>Close</Button>
        </>
      )}
    </div>
  );
};

export default NewGrocery;
