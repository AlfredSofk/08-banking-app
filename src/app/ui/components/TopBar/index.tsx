
import { useState } from 'react';
import './style.scss'
import { useLoginToken } from '../../../core/hooks/useLoginToken';
export const TopBar = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {logoutUser} =useLoginToken()

    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
      console.log('logout')
      logoutUser()
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
            <span className="topbar__user-name" aria-hidden="false">Usuario</span>
            <span className="topbar__dropdown-icon" aria-hidden="true">▼</span>
          </div>
          {isDropdownOpen && (
            <div className="topbar__dropdown" role="menu">
              <button className="topbar__dropdown-item" role="menuitem" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
    );


}