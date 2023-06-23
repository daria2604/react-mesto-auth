import React from "react"
import Popup from "./Popup";

function PopupWithForm({ name, title, button, isOpen, onClose, onSubmit, ...props }) {
  return (
    <Popup name={name} isOpen={isOpen} onClose={onClose}>
      <form
        className={`popup__form popup__form_type_${name}`}
        name={`${name}Form`}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        <h3 className={`popup__heading popup__heading_type_${name}`}>
          {title}
        </h3>
        {props.children}
        <button
          type="submit"
          className={`popup__submit-button popup__submit-button_type_${name}`}
        >
          {button || 'Сохранить'}
        </button>
      </form>
    </Popup>
  )
};

export default PopupWithForm;
