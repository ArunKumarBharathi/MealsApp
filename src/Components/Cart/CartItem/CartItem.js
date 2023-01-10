import { currencyModifer } from "../../CurrencyModify";
import CartUpdate from "../CartUpdate/CartUpdate";
import "./CartItem.css";

const CartItem = (props) => {
  return (
    <>
      <div className="cart-items">
        <div className="cart-items-name">{props.item.name}</div>
        <CartUpdate item={props.item} count={props.item.count} />
        <div className="cart-items-price">{currencyModifer(props.amount)}</div>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
