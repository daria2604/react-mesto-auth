import React from "react"

function AuthForm({ title, button, ...props }) {
  return (
    <div className="auth">
      <form
        className="auth__form">
        <h3 className="auth__heading">{title}</h3>
        <input
          type="email"
          placeholder="Email"
          className="auth__input auth__input_type_email"
          value=""
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          className="auth__input auth__input_type_password"
          value=""
          required
        />
        <button
          type="submit"
          className="auth__submit-button"
        >
          {button}
        </button>
      </form>
      {props.children}
    </div>
  )
};

export default AuthForm;
