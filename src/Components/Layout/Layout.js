import { useEffect, useState } from "react";
import "./Layout.css";
import Summary from "../Sumary";
import Header from "../../Components/UI/Header/Header";
import jwt_decode from "jwt-decode";
import Modal from "../../Components/UI/Modal/Modal";
import { Outlet } from "react-router-dom";
import Meals from "../Meals/Meals";

function Layout() {
  const [user, setUser] = useState({});

  function handleAuthentication(response) {
    setUser(jwt_decode(response.credential));
  }

  function signOutHandler() {
    setUser({});
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "800994910426-d3kpc8gtk5f3bemvgf9428onh7bjih6k.apps.googleusercontent.com",
      callback: handleAuthentication,
    });

    google.accounts.id.renderButton(document.getElementById("signInGoogle"), {
      theme: "outline",
      size: "large",
    });
  }, [user]);

  return (
    <>
      {Object.keys(user).length === 0 ? (
        <Modal className="login-modal">
          <div className="login">Login</div>
          <div id="signInGoogle" className="google"></div>
        </Modal>
      ) : (
        <>
          <Header signOut={signOutHandler} />
          <Summary />
          <Meals />
          <Outlet />
        </>
      )}
    </>
  );
}

export default Layout;
