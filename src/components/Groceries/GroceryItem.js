import Card from "../UI/Card/Card";
import classes from "./GroceryItem.module.css";

const GroceryItem = (props) => {
  return (
    <li>
      <Card className={classes["grocery-item"]}>
        <div className={classes["grocery-item__description"]}>
          <button>-</button>
          <div className={classes["grocery-item__qty"]}>{props.quantity}</div>
          <button>+</button>
          <h2>{props.title}</h2>
          <div>
            <button>Purchased</button>
            <button>Delete</button>
          </div>
        </div>
      </Card>
    </li>
  );
};

export default GroceryItem;
