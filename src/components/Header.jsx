import React from "react";
import headerLogo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ email, onSignOut }) {
  const location = useLocation();

  return (
    <>
    <div className="mobile-menu">
      <p className="mobile-menu__email">{email}</p>
      <button
        type="button"
        className="header__nav-link header__nav-button mobile-menu__signout"
        onClick={onSignOut}
      >
        Выйти
      </button>
    </div>
    <header className="header">
      <a href="#" className="header__link">
        <img src={headerLogo} alt="Логотип" className="header__logo" />
      </a>
      {location.pathname === "/sign-up" && (
        <div className="header__nav">
          <Link to="/sign-in" className="header__nav-link">
            Войти
          </Link>
        </div>
      )}
      {location.pathname === "/sign-in" && (
        <div className="header__nav">
          <Link to="/sign-up" className="header__nav-link">
            Регистрация
          </Link>
        </div>
      )}
      {location.pathname === "/" && (
        <div className="header__nav">
          <p className="header__email">{email}</p>
          <button
            type="button"
            className="header__nav-link header__nav-button"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </div>
      )}
       {location.pathname === "/" && (
        <button type="button" className="mobile-menu__button"></button>
      )}
    </header>
    </>
  );
}

export default Header;
