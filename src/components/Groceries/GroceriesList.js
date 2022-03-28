import GroceryItem from "./GroceryItem";
import classes from "./GroceriesList.module.css";

const GroceriesList = (props) => {
  if (props.items.length === 0) {
    return (
      <h2 className={classes["groceries-list__fallback"]}>
        No Groceries Found. Add Items to Get Started...
      </h2>
    );
  }

  return (
    <ul className={classes["groceries-list"]}>
      {props.items.map((grocery) => (
        <GroceryItem
          title={grocery.title}
          quantity={grocery.quantity}
          key={grocery.id}
        />
      ))}
    </ul>
  );
};

export default GroceriesList;
