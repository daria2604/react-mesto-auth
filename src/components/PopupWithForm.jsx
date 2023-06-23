import React from "react"
import Form from "./Form";
import Popup from "./Popup";

function PopupWithForm({ name, title, button, isOpen, onClose, onSubmit, ...props }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <Form name={name} title={title} onSubmit={onSubmit} button={button}>
        {props.children}
      </Form>
    </Popup>
  )
};

export default PopupWithForm;
