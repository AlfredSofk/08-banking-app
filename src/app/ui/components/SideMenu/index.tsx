import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaUser, FaCog, FaQuestion, FaBars, FaChevronDown } from 'react-icons/fa';
import { CiBank } from 'react-icons/ci';
import './style.scss';
import { routerDef } from '../../../routes';
import { TransactionItem } from '../TransactionItem';

export const SideMenu = () => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const transactionContainer = routerDef[0].children
  const trasactionPaths = transactionContainer?.slice(1, -2)

  const navigate = useNavigate();

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  const handleNavigate = (path: string) => {
    let newPath = `/home/${path}`;
    navigate(newPath);
  };

  return (
    <aside className={`sidebar ${isExpanded ? 'sidebar--expanded' : ''}`} role='navigation' aria-label="Barra lateral de navegación">
      <button className="sidebar__toggle" onClick={handleToggleSidebar} aria-label="Expandir menú">
        <FaBars />
      </button>
      <div className="sidebar__logo"><CiBank /><p>BankU</p></div>

      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <button
            className="sidebar__button"
            aria-label="Inicio"
            onClick={() => handleNavigate('inicio')}
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
            data-testid="botonDropdown"
          >
            <FaUser />
            {isExpanded && <span className="sidebar__text">Transacciones</span>}
            {isExpanded && <FaChevronDown className="sidebar__icon--dropdown" />}
          </button>
          { isDropdownOpen && 
            isExpanded &&
            <ul className="sidebar__submenu" data-testid="submenu">
              {
                trasactionPaths?.map((route, index) => {
                  return (
                    <TransactionItem key={index} path={route.path} handleNavigate={handleNavigate} />
                  )
                })       
              }
            </ul>
          }
      
        </li>
        <li className="sidebar__item">
          <button
            className="sidebar__button"
            aria-label="Cuenta"
            onClick={() => handleNavigate('account')}
          >
            <FaCog />
            {isExpanded && <span className="sidebar__text">Cuenta</span>}
          </button>
        </li>

        <li className="sidebar__item">
          <button
            className="sidebar__button"
            aria-label="Ayuda"
            onClick={() => handleNavigate('about')}
          >
            <FaQuestion />
            {isExpanded && <span className="sidebar__text">Acerca de</span>}
          </button>
        </li>
      </ul>
    </aside>
  );
};
