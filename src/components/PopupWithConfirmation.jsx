import React from "react"
import PopupWithForm from "./PopupWithForm";

function PopupWithConfirmation({ card, isOpen, onClose, onOverlay, onConfirm  }) {
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
      onOverlay={onOverlay}
      onSubmit={handleSubmit}
    />
  )
};

export default PopupWithConfirmation;
