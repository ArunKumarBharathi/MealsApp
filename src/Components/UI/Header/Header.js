import { useState } from "react";
import CartIcon from "../Icon/CartIcon";
import "./Header.css";
import { NavLink } from "react-router-dom";

const Header = (props) => {
  const [isInActive, setInActive] = useState(false);
  const showNavItems = () => {
    setInActive((prevState) => !prevState);
  };

  const classes = isInActive ? "lists is-active" : "lists";
  return (
    <>
      <nav className="header">
        <div className="header-title">Our Foods</div>
        <ul className={classes}>
          <li>
            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "header-items active" : "header-items"
              }
            >
              My Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "header-items active" : "header-items"
              }
            >
              <CartIcon />
            </NavLink>
          </li>
          <div className="dropdown">
            <li className="header-items">Arun Kumar</li>
            <div className="dropdown-content">
              <div className="a-item" onClick={props.signOut}>
                Sign out
              </div>
            </div>
          </div>
        </ul>
        <i
          className="fa fa-bars nav-icon"
          aria-hidden="true"
          onClick={showNavItems}
        ></i>
      </nav>
    </>
  );
};

export default Header;
