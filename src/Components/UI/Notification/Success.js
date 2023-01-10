import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import "./Success.css";

export const Success = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const classes = state.includes("Order Placed Successfully")
    ? "success-modal"
    : "failer-order";
  return (
    <Modal className={classes}>
      <div className="success">
        <div className="success-txt">{state}</div>
        <div className="close" onClick={() => navigate("/")}>
          X
        </div>
      </div>
    </Modal>
  );
};
