import { useState } from "react";

export const SideMenu = () => {


    const [isTransactionsOpen, setIsTransactionsOpen] = useState(false);

    const toggleTransactions = () => {
        setIsTransactionsOpen(!isTransactionsOpen);
    };

    return (
        <nav className='side-menu' aria-label="Menú principal">
            <button className='side-menu__toggle' aria-label="Abrir menú">
                ☰
            </button>
            <ul className='side-menu__list'>
                <li className='side-menu__item'>
                    <button
                        className='side-menu__link'
                        aria-expanded={isTransactionsOpen}
                        aria-controls="transacciones-menu"
                        onClick={toggleTransactions}
                    >
                        Transacciones
                    </button>
                    {isTransactionsOpen && (
                        <ul
                            id="transacciones-menu"
                            className='side-menu__dropdown'
                            aria-label="Submenú de transacciones"
                        >
                            <li className='side-menu__dropdown-item'>
                                <a href="#retirar" className='side-menu__dropdown-link'>Retirar Cajero</a>
                            </li>
                            <li className='side-menu__dropdown-item'>
                                <a href="#depositar" className='side-menu__dropdown-link'>Depositar Cajero</a>
                            </li>
                            <li className='side-menu__dropdown-item'>
                                <a href="#deposito" className='side-menu__dropdown-link'>Depósito</a>
                            </li>
                            <li className='side-menu__dropdown-item'>
                                <a href="#transferencias" className='side-menu__dropdown-link'>Transferencias</a>
                            </li>
                            <li className='side-menu__dropdown-item'>
                                <a href="#compraWeb" className='side-menu__dropdown-link'>Compra Web</a>
                            </li>
                            <li className='side-menu__dropdown-item'>
                                <a href="#compraEstablecimiento" className='side-menu__dropdown-link'>Compra Establecimiento</a>
                            </li>
                        </ul>
                    )}
                </li>
                <li className='side-menu__item'>
                    <a href="#cuenta" className='side-menu__link'>Cuenta</a>
                </li>
                <li className={`$'side-menu__item' $'side-menu__item--bottom'`}>
                    <a href="#acerca-de" className='side-menu__link'>Acerca de</a>
                </li>
            </ul>
        </nav>
    );



}