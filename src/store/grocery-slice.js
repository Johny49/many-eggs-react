import { createSlice } from "@reduxjs/toolkit";

export const grocerySlice = createSlice({
  name: "groceryItems",
  initialState: {
    items: [],
    changed: false,
  },
  reducers: {
    replaceGroceryList(state, action) {
      if (action.payload !== null) {
        state.items = action.payload.groceryItems;
      } else {
        state.items = [];
      }
      state.changed = false;
    },
    addItemToList: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(
        (item) => item.title === newItem.title
      );
      state.changed = true;
      // add to list if new
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: newItem.quantity,
          title: newItem.title,
          isPurchased: newItem.isPurchased,
        });
      } else {
        // update existing quantity
        existingItem.quantity = existingItem.quantity + newItem.quantity;
        existingItem.isPurchased = false;
      }
    },
    removeItemFromList: (state, action) => {
      const itemToRemove = action.payload;
      const existingItem = state.items.find(
        (item) => item.id === itemToRemove.id
      );
      state.changed = true;
      if (existingItem.quantity - itemToRemove.quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== itemToRemove.id);
      } else {
        existingItem.quantity = existingItem.quantity - itemToRemove.quantity;
      }
    },
    markItemPurchased: (state, action) => {
      const purchasedItem = action.payload;
      const listItem = state.items.find((item) => item.id === purchasedItem.id);
      state.changed = true;
      listItem.isPurchased = true;
      listItem.quantity = 0;
    },
    buyItemAgain: (state, action) => {
      const buyAgainItem = action.payload;
      const listItem = state.items.find((item) => item.id === buyAgainItem.id);
      state.change = true;
      listItem.isPurchased = false;
      listItem.quantity = 1;
    },
  },
});

// actions
export const groceryActions = grocerySlice.actions;
// selector
export const selectGroceryItems = (state) => state.groceryItems.items;
export const selectGroceriesChanged = (state) => state.groceryItems.changed;
// reducer
export default grocerySlice.reducer;
