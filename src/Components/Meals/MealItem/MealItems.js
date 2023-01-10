import React from "react";
import CartUpdate from "../../Cart/CartUpdate/CartUpdate";
import "./MealItem.css";
import { currencyModifer } from "../../CurrencyModify";

const MealItem = (props) => {
  return (
    <>
      <div className="meal-grp">
        <div className="items">
          <div className="items-name">{props.items.name}</div>
          <div className="items-desc">{props.items.description}</div>
          <div className="items-price">
            {currencyModifer(props.items.price)}
          </div>
        </div>
        <CartUpdate item={props.items} />
      </div>
      <hr />
    </>
  );
};

export default React.memo(MealItem);
