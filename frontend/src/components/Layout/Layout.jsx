import React from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { LayoutContainer, MainContent } from './styles';

function Layout({ children }) {
  return (
    <LayoutContainer>
      <Navbar />
      <MainContent>{children}</MainContent>
      <Footer />
    </LayoutContainer>
  );
}

export default Layout; 