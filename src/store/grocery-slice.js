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
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.changed = true;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          quantity: newItem.quantity,
          title: newItem.title,
          isPurchased: newItem.isPurchased,
        });
      } else {
        existingItem.quantity = existingItem.quantity + newItem.quantity;
      }
    },
    RemoveItemFromList: (state, action) => {
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
  },
});

// actions
export const groceryActions = grocerySlice.actions;
// selector
export const selectGroceryItems = (state) => state.groceryItems.items;
export const selectGroceriesChanged = (state) => state.groceryItems.changed;
// reducer
export default grocerySlice.reducer;
