import { useState } from "react";
import { OrderForm } from "../UI/Form/OrderForm";
import Modal from "../UI/Modal/Modal";
import { Success } from "../UI/Notification/Success";
import "./Cart.css";
import CartItem from "./CartItem/CartItem";
import { currencyModifer } from "../CurrencyModify";
import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

const Cart = (props) => {
  const [paymentForm, setOpenPaymentForm] = useState(false);

  const cartSelector = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const total = currencyModifer(
    cartSelector.totalAmount > 0 ? cartSelector.totalAmount : 0
  );

  const orderHandler = () => {
    setOpenPaymentForm((prevState) => !prevState);
    navigate("form");
  };
  return (
    <>
      <Modal className="cart-modal">
        <div className="cart">
          <div className="cart-header">My Cart</div>
          {cartSelector.items.map((meal) => (
            <CartItem
              key={meal.id}
              item={meal}
              amount={(meal.price * meal.count).toFixed(2)}
            />
          ))}
          <div className="cart-footer">
            <div className="total-txt">Total Amount</div>
            <div className="total">{total}</div>
          </div>
          {!paymentForm && (
            <div className="btn-grp">
              <button className="btn close" onClick={() => navigate("/")}>
                Close
              </button>
              {cartSelector.items.length > 0 && (
                <button className="btn order" onClick={orderHandler}>
                  Proceed to pay
                </button>
              )}
            </div>
          )}
          <Outlet />
        </div>
      </Modal>
    </>
  );
};

export default Cart;
