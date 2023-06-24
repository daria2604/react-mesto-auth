import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";
import useForm from "../hooks/useForm";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({});

  React.useEffect(() => {
    setValues({
      name: currentUser.name,
      about: currentUser.about,
    });
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser(values);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      button={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Имя"
        className="popup__input popup__input_type_name"
        name="name"
        minLength={2}
        maxLength={40}
        value={values.name || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <span className="popup__input-error popup__input-error_type_name" />
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_about"
        name="about"
        minLength={2}
        maxLength={200}
        value={values.about || ""}
        onChange={(evt) => {
          handleChange(evt);
        }}
        required
      />
      <span className="popup__input-error popup__input-error_type_about" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
