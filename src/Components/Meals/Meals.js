import MealItems from "./MealItem/MealItems";
import "./Meals.css";
import Card from "../UI/Card/Card";
import { useCallback, useEffect } from "react";
import { Spinner } from "../UI/Spinner/Spinner";
import useHttp from "../../Hooks/Use-http";
import { addMeals, setMealsError } from "../../Store/cartSlice";
import { useSelector, useDispatch } from "react-redux";

const Meals = (props) => {
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  const { fetchRequest } = useHttp();

  const addMealsHandler = useCallback(
    (meals) => {
      dispatch(addMeals(meals));
    },
    [dispatch]
  );

  const setError = useCallback(
    (error) => {
      dispatch(setMealsError(error));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchRequest(
      {
        url: "https://reactread-ee12c-default-rtdb.firebaseio.com/meals.json",
      },
      addMealsHandler,
      setError
    );
  }, [fetchRequest, addMealsHandler, setError]);

  return (
    <Card className="meals">
      {!cartSelector.error && cartSelector.meals.length === 0 ? (
        <Spinner />
      ) : (
        cartSelector.meals.map((meal) => (
          <MealItems key={meal.id} items={meal} />
        ))
      )}
      {cartSelector.error && <div className="error">{cartSelector.error}</div>}
    </Card>
  );
};

export default Meals;
