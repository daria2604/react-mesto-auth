import React from "react"
import successIcon from "../images/approve-icon.svg"
import failureIcon from "../images/disapprove-icon.svg"

function InfoTooltip({ isOpen, onClose, onOverlay, isSuccess }) {
  return (
    <div
    className={`popup ${isOpen ? 'popup_opened' : ''}`}
    onMouseDown={onOverlay}
    >
    <div className="popup__container">
      <button
        className="button button_action_close"
        type="button"
        onClick={onClose}/>
      <div className="popup__info">
        {isSuccess
        ? <img src={successIcon} alt="Черный крест в черном круге" className="popup__info-icon" />
        : <img src={failureIcon} alt="Красный крест в красном круге" className="popup__info-icon" /> }
        <div className="popup__info-container">
          {isSuccess
          ? <p className="popup__info-text">Вы успешно зарегистрировались!</p>
          : <p className="popup__info-text">Что-то пошло не так! Попробуйте ещё раз.</p>}
        </div>
      </div>
    </div>
  </div>
  )
};

export default InfoTooltip;
