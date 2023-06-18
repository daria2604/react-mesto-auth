import React from "react";
import AuthForm from "./AuthForm";
import { Link } from "react-router-dom";

function Register(props) {
  function handleSubmit(email, password) {
    props.onRegister(email, password)
  }

  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
      onSubmit={handleSubmit}
    >
      <p className="auth__caption">
        Уже зарегистрированы?
        <Link to="/sign-in" className="auth__link">
          Войти
        </Link>
      </p>
    </AuthForm>
  );
}

export default Register;
