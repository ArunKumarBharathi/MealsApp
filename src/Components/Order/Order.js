import Modal from "../UI/Modal/Modal";
import Card from "../UI/Card/Card";
import "./Order.css";
import { useEffect } from "react";
import { useState } from "react";
import useHttp from "../../Hooks/Use-http";
import { Spinner } from "../UI/Spinner/Spinner";
import { currencyModifer } from "../CurrencyModify";
import { useNavigate } from "react-router-dom";

const Order = (props) => {
  const [error, setError] = useState(null);
  const [contents, setcontents] = useState([]);
  const { fetchRequest, isLoading } = useHttp();
  const navigate = useNavigate();
  useEffect(() => {
    fetchRequest(
      {
        url: "https://reactread-ee12c-default-rtdb.firebaseio.com/Orders.json",
      },
      fetchOrders,
      setErrorMessage
    );
  }, [fetchRequest]);

  const setErrorMessage = (data) => setError(data);

  const fetchOrders = (orders) => {
    let content = [];
    for (const key in orders) {
      const order = orders[key].order;
      content.push({
        key,
        items: order.items
          .map((item) => ` ${item.name} x ${item.count}`)
          .join(),
        total: order.total,
      });
    }
    setcontents(content);
  };

  return (
    <Modal className="order-modal">
      <div className="cart-header">My orders</div>
      {isLoading ? (
        <Spinner />
      ) : !error ? (
        contents.length > 0 ? (
          contents.reverse().map((content) => {
            return (
              <Card className="order-card" key={content.key}>
                <div className="order-details">
                  <div className="order-items">{content.items}</div>
                  <div className="order-amount">
                    Total: {currencyModifer(content.total)}
                  </div>
                </div>
              </Card>
            );
          })
        ) : (
          <div className="order-text">No Orders found!</div>
        )
      ) : (
        <div className="order-text">{error}</div>
      )}
      <div className="btn-grp">
        <button className="btn" onClick={() => navigate("/")}>
          Close
        </button>
      </div>
    </Modal>
  );
};

export default Order;
