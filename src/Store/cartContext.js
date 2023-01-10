import React from "react";

const CartContext = React.createContext({
  items: [],
  meals: [],
  totalAmount: 0,
  user: {},
  addItem: (item) => {},
  removeItem: (item) => {},
  addMeals: (meals) => {},
  resetCart: () => {},
});

export default CartContext;
