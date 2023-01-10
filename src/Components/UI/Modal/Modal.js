import ReactDOM from "react-dom";
import Card from "../Card/Card";
import "./Modal.css";

const Modal = (props) => {
  const classes = "modal-card " + props.className;
  return ReactDOM.createPortal(
    <div>
      <div className="modal">
        <Card className={classes}>{props.children}</Card>
      </div>
      <div className="modal-overlay"></div>
    </div>,
    document.getElementById("overlays")
  );
};

export default Modal;
