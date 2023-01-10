import React from "react";
import "./CartIcon.css";
import { useSelector } from "react-redux";

const Cart = (props) => {
  const cartSelector = useSelector((state) => state.cart);
  return (
    <button className="btn">
      <span className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          alignmentBaseline="middle"
        >
          <circle cx="10" cy="20.5" r="1" />
          <circle cx="18" cy="20.5" r="1" />
          <path d="M2.5 2.5h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6l1.6-8.4H7.1" />
        </svg>
      </span>
      <span className="btn-text">Cart</span>
      <span className="btn-badge">{cartSelector.items.length}</span>
    </button>
  );
};

export default React.memo(Cart);
