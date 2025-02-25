import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    // Header
    <header class="header-container container-fluid">
        
        {/* Navbar com Menu Hambúrguer e Dropdown */}
        <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container text-center main-container">
                <div className="logo">
                    <Link to="/">
                        <img id="logo" className="img-fluid" src="../assets/logo-branco-sem-fundo.png" alt="Logo Milkmax" />
                    </Link>
                </div>

                {/* Menu Hambúrguer */}
                <button className="navbar-toggler bg-light" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">

                {/* Alterar navbar a depender se usuário está ou não logado */}
                {isLoggedIn ? (
                    <ul className="navbar-nav mx-auto mb-lg-0 justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/relatorios">Relatórios</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/vacas">Vacas</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/diario">Diário</Link>
                    </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav mx-auto mb-lg-0 justify-content-center">
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/#features">Funcionalidades</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/#about">Sobre</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/#testimonials">Testemunhos</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/#prices">Preços</Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link text-light active" to="/contato">Contato</Link>
                    </li>
                    </ul>
                )}

                {isLoggedIn ? (
                    <button className="btn btn-light text-primary btn-login px-4 py-1" onClick={logout}>
                    Log out
                    </button>
                ) : (
                    <Link className="btn btn-light text-primary btn-login px-4 py-1" to="/login">
                    Log in
                    </Link>
                )}
                </div>
            </div>
        </nav>
    </header>
  );
}

export default Navbar;