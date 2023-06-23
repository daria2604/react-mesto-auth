import React from "react"
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, onLoading }) {
  const avatarRef = React.useRef()

  React.useEffect(() => {
    avatarRef.current.value = ''
  }, [isOpen])

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({ avatar: avatarRef.current.value })
  }

  return (
    <PopupWithForm
      name="avatar"
      title="Обновить аватар"
      button={onLoading ? `Сохранение...` : `Сохранить`}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="url"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_type_avatar"
        name="avatar-link"
        defaultValue=""
        required=""
        ref={avatarRef}
      />
      <span className="popup__input-error popup__input-error_type_avatar-link" />
    </PopupWithForm>
  )
};

export default EditAvatarPopup;
