import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const [title, setTitle] = React.useState("");
  const [link, setLink] = React.useState("");

  React.useEffect(() => {
    setTitle("");
    setLink("");
  }, [isOpen]);

  function handleTitleChange(evt) {
    setTitle(evt.target.value);
  }

  function handleLinkChange(evt) {
    setLink(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title, link });
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      button={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Название"
        className="popup__input popup__input_type_title"
        name="title"
        minLength={2}
        maxLength={30}
        value={title}
        onChange={handleTitleChange}
        required
      />
      <span className="popup__input-error popup__input-error_type_title" />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link"
        name="link"
        value={link}
        onChange={handleLinkChange}
        required
      />
      <span className="popup__input-error popup__input-error_type_link" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
