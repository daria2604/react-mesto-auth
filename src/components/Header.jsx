import React from "react"
import headerLogo from "../images/logo.svg"
import { Link, useLocation } from "react-router-dom"

function Header() {
  const location = useLocation()

  return (
    <header className="header">
      <a href="#" className="header__link">
        <img
          src={headerLogo}
          alt="Логотип"
          className="header__logo"
        />
      </a>
      {location.pathname !== '/sign-in' && <p className="header__nav"><Link to="/sign-up" className="header__link">Войти</Link></p>}
      {location.pathname !== '/sign-up' && <p className="header__nav"><Link to="/sign-in" className="header__link">Регистрация</Link></p>}
    </header>
  )
};

export default Header;
