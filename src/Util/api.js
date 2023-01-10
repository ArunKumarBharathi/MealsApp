import { useDispatch, useSelector } from "react-redux";
import useHttp from "../Hooks/Use-http";

const dispatch = useDispatch();
const cartSelector = useSelector((state) => state.cart);
const { fetchRequest } = useHttp();

export function getmeals() {
  fetchRequest(
    {
      url: "https://reactread-ee12c-default-rtdb.firebaseio.com/meals.json",
    },
    addMealsHandler,
    setError
  );
}

const addMealsHandler = (meals) => {
  return meals;
};

const setError = useCallback(
  (error) => {
    dispatch(setMealsError(error));
  },
  [dispatch]
);
