import { useState } from "react";
import useForm from "../../../Hooks/Use-form";
import useHttp from "../../../Hooks/Use-http";
import { Spinner } from "../Spinner/Spinner";
import { SignUpForm } from "./Utils/formConfig";
import { useDispatch, useSelector } from "react-redux";
import { resetCart } from "../../../Store/cartSlice";
import { useNavigate } from "react-router-dom";

export const OrderForm = (props) => {
  const [payment, setPayment] = useState(null);
  const { createForm, form } = useForm(SignUpForm);

  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const postOrder = async (event) => {
    event.preventDefault();
    const items = cartSelector.items.map((item) => {
      return { count: item.count, name: item.name };
    });
    const order = {
      items,
      total: cartSelector.totalAmount,
    };
    const orderDetails = {
      order,
      customer: {
        name: form.name.value,
        address: form.address.value,
        phoneNumber: form.phone.value,
        payment,
      },
    };
    fetchRequest(
      {
        url: "https://reactread-ee12c-default-rtdb.firebaseio.com/Orders.json",
        method: "POST",
        body: JSON.stringify(orderDetails),
        headers: {
          "Content-Type": "application/json",
        },
      },
      submitOrders,
      setErrorMessage
    );
  };

  const { fetchRequest, isLoading } = useHttp();

  const setErrorMessage = (data) => {
    navigate("/order-status", { state: data });
  };

  const submitOrders = (data) => {
    navigate("/order-status", {
      state: `Order Placed Successfully with id ${data.name}`,
    });
    dispatch(resetCart());
  };
  return (
    <>
      {!isLoading ? (
        <form className="order" onSubmit={postOrder}>
          <div
            style={{
              textAlign: "center",
              color: "cadetblue",
              fontSize: "24px",
              margin: "10px",
            }}
          >
            Enter your details
          </div>
          {createForm()}
          <div className="form-control">
            <label>Payment Type</label>
            <select
              name="payment"
              required
              id=""
              placeholder="Enter a payment mode"
              onChange={(e) => setPayment(e.target.value)}
            >
              <option value=""></option>
              <option value="Cash">Cash</option>
              <option value="UPI">UPI</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <hr />
          <div className="btn-grp">
            <button
              className="btn close"
              type="button"
              onClick={() => navigate("/")}
            >
              Cancel
            </button>
            <button className="btn order">Place Order</button>
          </div>
        </form>
      ) : (
        <Spinner />
      )}
    </>
  );
};
