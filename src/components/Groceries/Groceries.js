import { useDispatch, useSelector } from "react-redux";
import { selectGroceryItems, groceryActions } from "../../store/grocery-slice";

import GroceriesList from "./GroceriesList";
import NewGrocery from "../NewGrocery/NewGrocery";
import Card from "../UI/Card/Card";
import classes from "./Groceries.module.css";

const Groceries = () => {
  const groceryItems = useSelector(selectGroceryItems);

  const notPurchasedItems = groceryItems.filter(
    (item) => item.isPurchased === false
  );

  const dispatch = useDispatch();

  //handle reordering of items at end of drag/drop action
  const onDragEndHandler = (result) => {
    const { destination, source } = result;
    // invalid destination; no change in order
    if (!destination) {
      return;
    }

    // dragged to original location; no reorder needed
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // dispatch to store to reorder saved list based on new index of dragged item
    let destinationId = notPurchasedItems[destination.index].id;
    let sourceId = notPurchasedItems[source.index].id;

    dispatch(groceryActions.reorderList({ destinationId, sourceId }));
  };

  return (
    <div>
      <Card className={classes.groceries}>
        <NewGrocery />
        <GroceriesList
          items={notPurchasedItems}
          reorderHandler={onDragEndHandler}
        />
      </Card>
    </div>
  );
};

export default Groceries;
