import Modal from "../../UI/Modal/Modal";
import Card from "../../UI/Card/Card";
import "./Error.css";

const Error = (props) => {
  return (
    <Modal className="error-modal">
      <div className="error-txt">Oops! </div>
      <div className="error-txt">Page Not found!!!</div>{" "}
    </Modal>
  );
};

export default Error;
