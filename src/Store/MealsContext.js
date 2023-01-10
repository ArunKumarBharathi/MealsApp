import produce from "immer";
import React, { useReducer } from "react";

export const MealsContext = React.createContext(null);
// const defaultMeals = {
//   meals: [
//     {
//       id: "m1",
//       name: "Sushi",
//       description: "Finest fish and veggies",
//       price: 22.99,
//       count: 0,
//     },
//     {
//       id: "m2",
//       name: "Schnitzel",
//       description: "A german specialty!",
//       price: 16.5,
//       count: 0,
//     },
//     {
//       id: "m3",
//       name: "Barbecue Burger",
//       description: "American, raw, meaty",
//       price: 12.99,
//       count: 0,
//     },
//     {
//       id: "m4",
//       name: "Green Bowl",
//       description: "Healthy...and green...",
//       price: 18.99,
//       count: 0,
//     },
//   ],
// };

const MealsProvider = (props) => {
  const mealsReducer = (state, action) => {
    if (action.type === "ADD MEAL") {
      return produce(state, (draft) => {
        draft.meals.push(...action.meals);
      });
    }
    return state;
  };
  const [mealsState, updateMeals] = useReducer(mealsReducer, { meals: [] });
  const addMealsHandler = (meals) => {
    updateMeals({ type: "ADD MEAL", meals });
  };
  const currentMeals = {
    meals: mealsState.meals,
    addMeals: addMealsHandler,
  };
  return (
    <MealsContext.Provider value={currentMeals}>
      {props.children}
    </MealsContext.Provider>
  );
};

export default MealsProvider;
