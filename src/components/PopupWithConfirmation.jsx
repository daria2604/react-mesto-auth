import React from "react"
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ card, isOpen, onClose, onConfirm  }) {
  function handleSubmit(evt) {
    evt.preventDefault()
    onConfirm(card)
  }

  return (
    <PopupWithForm
      name="confirm"
      title="Вы уверены?"
      button="Да"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  )
};

export default PopupWithConfirmation;
