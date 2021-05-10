import React from "react";
import Button from "./Button";
const SuccessModal = ({ children, onCloseModal, header, buttonLabel }) => {
  return (
    <div className="overlay">
      <div className="modal">
        <h2>{header}</h2>
        {children}
        <Button label={buttonLabel} onClick={onCloseModal}/>
      </div>
    </div>
  );
};

export default SuccessModal;
