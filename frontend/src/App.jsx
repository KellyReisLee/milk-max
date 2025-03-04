import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import Contato from './pages/Contato';
import Diario from './pages/Diario';
import Home from './pages/Home';
import Login from './pages/Login';
import Relatorios from './pages/Relatorios';
import Signup from './pages/Signup';
import Vacas from './pages/Vacas';
import ForgotPassword from './pages/ForgotPassword';
import RedefSenha from './pages/RedefSenha';
import ForgotUsername from './pages/ForgotUsername';

import Layout from './components/Layout';

function App() {
  console.log('App renderizando');
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/relatorios" element={<Relatorios />} />
          <Route path="/vacas" element={<Vacas />} />
          <Route path="/forgot/password" element={<ForgotPassword />} />
          <Route path="/reset_password/:token" element={<RedefSenha />} />
          <Route path="/forgot/username" element={<ForgotUsername />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App
