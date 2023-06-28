import React from "react";

function ErrorMessage(props) {
  return (
    <span
      className={`popup__input-error ${props.errors && "popup__input-error_active"}`}
    >
      {props.children}
    </span>
  );
}

export default ErrorMessage;
