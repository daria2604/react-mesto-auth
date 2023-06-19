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
      {location.pathname === '/sign-up' && <div className="header__nav"><Link to="/sign-in" className="header__nav-link">Войти</Link></div>}
      {location.pathname === '/sign-in' && <div className="header__nav"><Link to="/sign-up" className="header__nav-link">Регистрация</Link></div>}
      {location.pathname === '/' && <div className="header__nav"><p className="header__email"></p><Link to="/sign-in" className="header__nav-link">Выйти</Link></div>}
    </header>
  )
};

export default Header;
