import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
  background-color: #1051AB;
  padding: 1rem 0;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

export const Logo = styled.div`
  width: 260px;

  img {
    width: 100%;
    height: auto;
  }
`;

export const NavbarToggler = styled.button`
  background-color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  display: none;

  @media (max-width: 991px) {
    display: block;
  }
`;

export const NavbarCollapse = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;

  @media (max-width: 991px) {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: #1051AB;
    padding: 1rem;
    flex-direction: column;
    align-items: center;

    &.show {
      display: flex;
    }
  }
`;

export const NavList = styled.ul`
  margin: 0;
  padding: 0;
  gap: 1.2rem;
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 991px) {
    flex-direction: column;
    width: 100%;
  }
`;

export const NavItem = styled.li`
  margin: 0;
  padding: 0;
`;

export const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  transition: color 0.2s;

  &:hover {
    color: #f0f0f0;
  }
`;

export const LoginButton = styled(Link)`
  background-color: white;
  color: #1051ab;
  border-radius: 0.25rem;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  margin: 20px 0;
  text-decoration: none;
  transition: all 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
    color: #1051ab;
    text-decoration: none;
  }

  @media (max-width: 991px) {
    width: 30%;
    margin-top: 1rem;
  }
`; 