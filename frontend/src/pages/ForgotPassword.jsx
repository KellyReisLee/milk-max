import React, { useState } from 'react';
import { config } from '../config';
import img1 from '@/assets/logo-reduzida-azul.png';
import img2 from '@/assets/loading.gif';

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { routes } = config;

    const handleSubmit = async (e) => {

    // Previne comportamento padrão de formulário ao recarregar a página
    e.preventDefault();

    // Validação do formulário e exibição de mensagens
    const form = e.target;
    if (!form.checkValidity()) {
        e.stopPropagation();
        form.classList.add('was-validated');
        return;
    }

    setLoading(true); // Mostra o ícone de carregamento

    const data = {
        email: email,
    };

    try {
        // Requisição POST para o backend
        const response = await fetch(routes.forgot_pass, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.success) {
                setMessage(data.message);
            } else {
                setMessage(data.message);
            }
        } else {
            setMessage('Erro ao processar solicitação'); // Exibe mensagem de erro
        }
    } catch (error) {
        console.error('Error:', error);
        setMessage('Ocorreu um erro ao tentar enviar o e-mail.');
    } finally {
        setLoading(false); // Esconde o ícone de carregamento
    }
    };

  return (
    <div className="wrapper">
        <div className="login-container">
            <div className="login-img">
                <img src={img1} alt="Logo" />
            </div>
            <div className="divisor"></div>
            {/* Formulário de redefinição de senha */}
            <div className="form-container">
                <h2 className="title-form">Esqueci minha senha</h2>
                <p>Para redefinir sua senha, preencha com seu e-mail.</p>
                <form className="needs-validation" id="loginForm" onSubmit={handleSubmit} noValidate>
                    <div className="form-group">
                        <label htmlFor="email"></label>
                        <input
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                        required
                        />
                        <div className="valid-feedback"></div>
                        <div className="invalid-feedback">Insira seu e-mail cadastrado.</div>
                    </div>
                    <button className="form-btn" type="submit">
                        <strong>REDEFINIR</strong>
                    </button>
                </form>
                {loading && (
                <div id="loading">
                    <img id="loadingimg" src={img2} alt="Carregando..." />
                </div>
                )}
                {message && (
                <div className="message mt-3" id="extra">
                    <p>{message}</p>
                </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default ForgotPassword;