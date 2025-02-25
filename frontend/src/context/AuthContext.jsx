import React, { createContext, useState } from 'react';

// Cria o contexto de autenticação
export const AuthContext = createContext();

// Cria o provedor de autenticação
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Função para fazer login
  const login = () => setIsLoggedIn(true);

  // Função para fazer logout
  const logout = () => setIsLoggedIn(false);

  // O valor do contexto é um objeto que contém o estado de login e as funções de login/logout
  const value = {
    isLoggedIn,
    login,
    logout,
  };

  // O AuthProvider envolve os componentes filhos e fornece o contexto a eles
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};