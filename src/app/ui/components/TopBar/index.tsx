
import { useState } from 'react';
import './style.scss'
export const TopBar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <header className="topbar" aria-label="Barra superior">
        <div className="topbar__content">
          <h1 className="topbar__title">Panel Bancario</h1>
          <div className="topbar__user" onClick={toggleDropdown}>
            <img
              src="https://via.placeholder.com/40"
              alt="Icono de usuario"
              className="topbar__user-icon"
              aria-hidden="true"
            />
            <span className="topbar__user-name">Usuario</span>
            <span className="topbar__dropdown-icon" aria-hidden="true">▼</span>
          </div>
          {isDropdownOpen && (
            <div className="topbar__dropdown" role="menu">
              <button className="topbar__dropdown-item" role="menuitem">
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );


}