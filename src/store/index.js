import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/user-slice";
import groceryReducer from "../store/grocery-slice";

const store = configureStore({
  reducer: {
    user: userReducer,
    groceryItems: groceryReducer,
  },
});

export default store;
