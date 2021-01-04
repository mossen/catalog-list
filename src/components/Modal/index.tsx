import React from "react";
import ModalPortal from "./ModalPortal";

type Props = {
  children: React.ReactNode;
  anchor: React.ReactNode;
  anchorClassName?: string;
};
/**
 * Modal component
 *
 * @param {*} props
 * @return {*}
 */
const Modal: React.FC<Props> = (props) => {
  const didMount = React.useRef(false);
  const [show, setShow] = React.useState(false);

  const escFunction = (event) => {
    if (event.keyCode === 27) {
      setShow(false);
    }
  };

  React.useEffect(() => {
    if (didMount.current) {
      if (show) {
        // Preventing body scrolling
        document.body.classList.add("overflow-hidden");
      } else {
        document.body.classList.remove("overflow-hidden");
      }
    } else {
      didMount.current = true;
    }
  }, [show]);

  React.useEffect(() => {
    document.addEventListener("keydown", (event) => escFunction(event), false);
    return () =>
      document.removeEventListener(
        "keydown",
        (event) => escFunction(event),
        false
      );
  }, []);

  return (
    <>
      <span
        className={props.anchorClassName}
        onClick={() => setShow((show) => !show)}
      >
        {props.anchor}
      </span>
      {show && (
        <ModalPortal onClose={() => setShow(false)}>
          {props.children}
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
