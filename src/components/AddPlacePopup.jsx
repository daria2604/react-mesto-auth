import React from "react";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace, onLoading }) {
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({});
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace(values);
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
        value={values.title || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <span className="popup__input-error popup__input-error_type_title" />
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_link"
        name="link"
        value={values.link || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <span className="popup__input-error popup__input-error_type_link" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
