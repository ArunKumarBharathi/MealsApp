import "./CartUpdate.css";
import { addItem, removeItem } from "../../../Store/cartSlice";
import { useDispatch } from "react-redux";

const CartUpdate = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      {props.item.count === 0 ? (
        <button
          className="add-btn"
          onClick={() => dispatch(addItem(props.item))}
        >
          Add
        </button>
      ) : (
        <div className="count-btn-grp">
          <button
            className="sizebtn"
            onClick={() => dispatch(addItem(props.item))}
          >
            +
          </button>
          <div className="count">{props.item.count}</div>
          <button
            className="sizebtn"
            onClick={() => dispatch(removeItem(props.item))}
          >
            -
          </button>
        </div>
      )}
    </>
  );
};

export default CartUpdate;
