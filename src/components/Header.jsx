import React from "react";
import headerLogo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";

function Header({ userData, onSignOut }) {
  const location = useLocation();

  return (
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
          <p className="header__email">{userData.data?.email}</p>
          <button
            type="button"
            className="header__nav-link header__nav-button"
            onClick={onSignOut}
          >
            Выйти
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
