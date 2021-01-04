import React from "react";
import { createPortal } from "react-dom";

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalPortal: React.FC<Props> = ({ children, onClose }) => {
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      {onClose ? (
        <div className="absolute top-0 left-0 w-full flex justify-end p-8">
          <span
            onClick={() => onClose()}
            className="flex items-center text-white cursor-pointer"
          >
            Close
          </span>
        </div>
      ) : null}
      {children}
    </div>,
    document.body
  );
};

export default ModalPortal;
