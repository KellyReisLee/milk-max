import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import img1 from '../../assets/logo-branco-sem-fundo.png';
import {
  HeaderContainer,
  Nav,
  Container,
  Logo,
  NavbarToggler,
  NavbarCollapse,
  NavList,
  NavItem,
  NavLink,
  LoginButton
} from './styles';

function Navbar() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <Nav>
        <Container>
          <Logo>
            <Link to="/">
              <img id="logo" src={img1} alt="Logo Milkmax" />
            </Link>
          </Logo>

          <NavbarToggler type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
            <span className="navbar-toggler-icon"></span>
          </NavbarToggler>
          <NavbarCollapse id="navbarSupportedContent">
            {isLoggedIn ? (
              <NavList>
                <NavItem>
                  <NavLink to="/relatorios">Relatórios</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/vacas">Vacas</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/diario">Diário</NavLink>
                </NavItem>
              </NavList>
            ) : (
              <NavList>
                <NavItem>
                  <NavLink as="a" href="#features">Funcionalidades</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink as="a" href="#about">Sobre</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink as="a" href="#testimonials">Testemunhos</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink as="a" href="#prices">Preços</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/contato">Contato</NavLink>
                </NavItem>
              </NavList>
            )}

            {isLoggedIn ? (
              <LoginButton to="/" onClick={logout}>
                Log out
              </LoginButton>
            ) : (
              <LoginButton to="/login">
                Log in
              </LoginButton>
            )}
          </NavbarCollapse>
        </Container>
      </Nav>
    </HeaderContainer>
  );
}

export default Navbar; 