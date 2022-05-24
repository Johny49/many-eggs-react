import { forwardRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import GroceryItem from "./GroceryItem";
import classes from "./GroceriesList.module.css";

const GroceriesList = forwardRef((props, ref) => {
  if (props.items.length === 0) {
    return (
      <h2 className={classes["groceries-list__fallback"]}>
        No Groceries Found. Add Items to Get Started...
      </h2>
    );
  }

  return (
    <DragDropContext onDragEnd={props.reorderHandler}>
      <Droppable droppableId="grocieries-list">
        {(provided) => (
          <ul
            className={classes["groceries-list"]}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {props.items.map((grocery, index) => (
              <GroceryItem
                index={index}
                id={grocery.id}
                title={grocery.title}
                quantity={grocery.quantity}
                key={grocery.id}
              />
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default GroceriesList;
