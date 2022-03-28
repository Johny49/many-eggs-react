import { useSelector } from "react-redux";
import { selectGroceryItems } from "../../store/grocery-slice";

import GroceriesList from "./GroceriesList";
import NewGrocery from "../NewGrocery/NewGrocery";
import Card from "../UI/Card/Card";
import classes from "./Groceries.module.css";

const Groceries = () => {
  const groceryItems = useSelector(selectGroceryItems);

  const notPurchasedItems = groceryItems.filter(
    (item) => item.isPurchased === false
  );

  return (
    <div>
      <Card className={classes.groceries}>
        <NewGrocery />
        <GroceriesList items={notPurchasedItems} />
      </Card>
    </div>
  );
};

export default Groceries;
