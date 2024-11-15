import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaQuestion, FaBars, FaChevronDown } from 'react-icons/fa';
import { CiBank } from 'react-icons/ci';
import './style.scss';

export const SideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = (path: string) => {
    console.log(path)
    navigate(path);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'sidebar--expanded' : ''}`} aria-label="Barra lateral de navegación">
      <button className="sidebar__toggle" onClick={handleToggleSidebar} aria-label="Expandir menú">
        <FaBars />
      </button>
      <div className="sidebar__logo"><CiBank /><p>BankU</p></div>

      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <button
            className="sidebar__button"
            aria-label="Inicio"
            onClick={() => handleNavigate('/home/inicio')}
          >
            <FaHome />
            {isExpanded && <span className="sidebar__text">Inicio</span>}
          </button>
        </li>

        <li className="sidebar__item sidebar__item--dropdown">
          <button
            className="sidebar__button"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="true"
            aria-expanded={isDropdownOpen}
          >
            <FaUser />
            {isExpanded && <span className="sidebar__text">Transacciones</span>}
            {isExpanded && <FaChevronDown className="sidebar__icon--dropdown" />}
          </button>
          {isDropdownOpen && isExpanded && (
            <ul className="sidebar__submenu">
              <li className="sidebar__submenu-item">
                <button className="sidebar__submenu-button" onClick={() => handleNavigate('/home/withdraw')}>
                  Retirar Cajero
                </button>
              </li>
              <li className="sidebar__submenu-item">
                <button className="sidebar__submenu-button" onClick={() => handleNavigate('/home/depositATM')}>
                  Depositar Cajero
                </button>
              </li>
              <li className="sidebar__submenu-item">
                <button className="sidebar__submenu-button" onClick={() => handleNavigate('/home/deposit-account')}>
                  Depósito
                </button>
              </li>
              <li className="sidebar__submenu-item">
                <button className="sidebar__submenu-button" onClick={() => handleNavigate('/home/transfer')}>
                  Transferencias
                </button>
              </li>
              <li className="sidebar__submenu-item">
                <button className="sidebar__submenu-button" onClick={() => handleNavigate('/home/purchase-web')}>
                  Compra Web
                </button>
              </li>
              <li className="sidebar__submenu-item">
                <button className="sidebar__submenu-button" onClick={() => handleNavigate('/home/purchase-store')}>
                  Compra Establecimiento
                </button>
              </li>
            </ul>
          )}
        </li>

        <li className="sidebar__item">
          <button
            className="sidebar__button"
            aria-label="Cuenta"
            onClick={() => handleNavigate('/home/account')}
          >
            <FaCog />
            {isExpanded && <span className="sidebar__text">Cuenta</span>}
          </button>
        </li>

        <li className="sidebar__item">
          <button
            className="sidebar__button"
            aria-label="Ayuda"
            onClick={() => handleNavigate('/home/about')}
          >
            <FaQuestion />
            {isExpanded && <span className="sidebar__text">Acerca de</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
};
