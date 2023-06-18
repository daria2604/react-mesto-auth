import React from "react";

function AuthForm({ title, button, onSubmit, ...props }) {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailChange(evt) {
    setEmail(evt.target.value)
  }

  function handlePasswordChange(evt) {
    setPassword(evt.target.value)
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onSubmit(email, password)
  }

  return (
    <div className="auth">
      <form className="auth__form" onSubmit={handleSubmit}>
        <h3 className="auth__heading">{title}</h3>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email || ''}
          className="auth__input auth__input_type_email"
          onChange={handleEmailChange}
          autoComplete="off"
          required
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={password || ''}
          className="auth__input auth__input_type_password"
          onChange={handlePasswordChange}
          autoComplete="off"
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
  );
}

export default AuthForm;
