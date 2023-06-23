import React from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import PopupWithForm from "./PopupWithForm"

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
  const [name, setName] = React.useState('')
  const [about, setAbout] = React.useState('')
  const currentUser = React.useContext(CurrentUserContext)

  React.useEffect(() => {
    setName(currentUser.name)
    setAbout(currentUser.about)
  }, [currentUser, isOpen])

  function handleNameChange(evt) {
    setName(evt.target.value)
  }

  function handleAboutChange(evt) {
    setAbout(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ name, about })
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
        required=""
        value={name || ""}
        onChange={handleNameChange}
      />
      <span className="popup__input-error popup__input-error_type_name" />
      <input
        type="text"
        placeholder="О себе"
        className="popup__input popup__input_type_about"
        name="about"
        minLength={2}
        maxLength={200}
        required=""
        value={about || ""}
        onChange={handleAboutChange}
      />
      <span className="popup__input-error popup__input-error_type_about" />
    </PopupWithForm>
  )
};

export default EditProfilePopup;
