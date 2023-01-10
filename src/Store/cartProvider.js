import { useEffect, useReducer } from "react";
import CartContext from "./cartContext";
import produce from "immer";
import useHttp from "../Hooks/Use-http";

const CartProvider = (props) => {
  const { fetchRequest } = useHttp();

  useEffect(() => {
    fetchRequest(
      { url: "https://reactread-ee12c-default-rtdb.firebaseio.com/meals.json" },
      addMealsHandler,
      setError
    );
  }, [fetchRequest]);

  const cartReducer = (state, action) => {
    if (action.type === "ADD MEAL") {
      return produce(state, (draft) => {
        draft.meals.push(...action.meals);
      });
    }
    if (action.type === "ADD ERROR") {
      return produce(state, (draft) => {
        draft.error = action.error;
      });
    }
    if (action.type === "RESET_CART") {
      return produce(state, (draft) => {
        draft.items = [];
        draft.meals = draft.meals.map((meal) => {
          return { ...meal, count: 0 };
        });
        draft.totalAmount = 0;
      });
    }
    let cartIndex = state.items.findIndex((item) => item.id === action.item.id);
    let currentItem = state.items[cartIndex];
    let mealIndex = state.meals.findIndex((item) => item.id === action.item.id);

    if (action.type === "ADD") {
      if (currentItem) {
        return produce(state, (draft) => {
          draft.items[cartIndex].count += 1;
          draft.meals[mealIndex].count += 1;
          draft.totalAmount += action.item.price;
        });
      } else {
        return produce(state, (draft) => {
          draft.items.push({ ...action.item, count: 1 });
          draft.meals[mealIndex].count += 1;
          draft.totalAmount += action.item.price;
        });
      }
    }
    if (action.type === "REMOVE") {
      if (currentItem.count === 1) {
        return produce(state, (draft) => {
          draft.items.splice(cartIndex, 1);
          draft.meals[mealIndex].count -= 1;
          draft.totalAmount -= action.item.price;
        });
      }
      return produce(state, (draft) => {
        draft.items[cartIndex].count -= 1;
        draft.meals[mealIndex].count -= 1;
        draft.totalAmount -= action.item.price;
      });
    }

    return state;
  };
  const defaultCart = {
    items: [],
    meals: [],
    totalAmount: 0,
    error: "",
  };
  const [cartItems, updateCart] = useReducer(cartReducer, defaultCart);

  const addCartHandler = (item) => {
    updateCart({ type: "ADD", item });
  };
  const removeCartHandler = (item) => {
    updateCart({ type: "REMOVE", item });
  };

  const addMealsHandler = (meals) => {
    updateCart({ type: "ADD MEAL", meals });
  };
  const setError = (error) => {
    updateCart({ type: "ADD ERROR", error });
  };
  const resetCartHandler = () => {
    updateCart({ type: "RESET_CART" });
  };
  const cartState = {
    meals: cartItems.meals,
    items: cartItems.items,
    totalAmount: cartItems.totalAmount,
    addItem: addCartHandler,
    removeItem: removeCartHandler,
    addMeals: addMealsHandler,
    error: cartItems.error,
    resetCart: resetCartHandler,
  };
  return (
    <CartContext.Provider value={cartState}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
