import React from "react"
import AuthForm from "./AuthForm";

function Register(props) {
  return (
    <AuthForm
      title="Регистрация"
      button="Зарегистрироваться"
    >
      <p className="auth__caption">Уже зарегистрированы?<a href="/sign-in" className="auth__link"> Войти</a></p>
    </AuthForm>
  )
};

export default Register;
