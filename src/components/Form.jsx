import React from "react"

function Form({ name, title, onSubmit, button, children }) {
  return (
    <form
      className={`popup__form popup__form_type_${name}`}
      name={`${name}Form`}
      autoComplete="off"
      onSubmit={onSubmit}
    >
      <h3 className={`popup__heading popup__heading_type_${name}`}>{title}</h3>
      {children}
      <button
        type="submit"
        className={`popup__submit-button popup__submit-button_type_${name}`}
      >
        {button || 'Сохранить'}
      </button>
    </form>
  )
};

export default Form;
