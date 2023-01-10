import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  meals: [],
  totalAmount: 0,
  user: {},
  error: "",
};

export const cartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    addItem: (state, action) => {
      let cartIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let currentItem = state.items[cartIndex];
      let mealIndex = state.meals.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentItem) {
        state.items[cartIndex].count += 1;
        state.meals[mealIndex].count += 1;
        let amount = state.totalAmount + action.payload.price;
        state.totalAmount = +amount.toFixed(2);
      } else {
        state.items.push({ ...action.payload, count: 1 });
        state.meals[mealIndex].count += 1;
        let amount = state.totalAmount + action.payload.price;
        state.totalAmount = +amount.toFixed(2);
      }
    },
    removeItem: (state, action) => {
      let cartIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      let currentItem = state.items[cartIndex];
      let mealIndex = state.meals.findIndex(
        (item) => item.id === action.payload.id
      );
      if (currentItem.count === 1) {
        state.items.splice(cartIndex, 1);
        state.meals[mealIndex].count -= 1;
        let amount = state.totalAmount - action.payload.price;
        state.totalAmount = +amount.toFixed(2);
      } else {
        state.items[cartIndex].count -= 1;
        state.meals[mealIndex].count -= 1;
        let amount = state.totalAmount - action.payload.price;
        state.totalAmount = +amount.toFixed(2);
      }
    },
    addMeals: (state, action) => {
      state.meals.push(...action.payload);
    },
    resetCart: (state) => {
      state.items = [];
      state.meals = state.meals.map((meal) => {
        return { ...meal, count: 0 };
      });
      state.totalAmount = 0;
    },
    setMealsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { addItem, removeItem, addMeals, resetCart, setMealsError } =
  cartSlice.actions;
export default cartSlice.reducer;
