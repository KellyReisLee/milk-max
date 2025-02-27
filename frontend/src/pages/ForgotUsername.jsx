import React, { useState } from 'react';

function ForgotUsername() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const route = '/forgot/username';

  const handleSubmit = async (e) => {
    
    // Previne comportamento padrão de formulário ao recarregar a página
    e.preventDefault();

    // Validação do formulário
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    setLoading(true); // Mostra o ícone de carregamento

    const data = {
        email: email,
        password: password
    };

    try {
        // Requisição POST para o backend
        const response = await fetch(route, {
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
            setMessage(data.message); // Exibe mensagem de erro
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
                <img src="../assets/logo-reduzida-azul.png" alt="Logo" />
            </div>
            <div className="divisor"></div>
            <div className="form-container">
                <h2 className="title-form">Esqueci meu usuário</h2>
                <p>Para redefinir seu usuário, preencha com seu e-mail e senha.</p>
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
                    <div className="form-group">
                        <label htmlFor="password"></label>
                        <input
                        id="password"
                        name="password"
                        placeholder="Senha"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                        <div className="valid-feedback"></div>
                        <div className="invalid-feedback">Insira sua senha.</div>
                    </div>
                    <button className="form-btn" type="submit">
                        <strong>VALIDAR</strong>
                    </button>
                </form>
                {loading && (
                <div id="loading">
                    <img id="loadingimg" src="../assets/loading.gif" alt="Carregando..." />
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

export default ForgotUsername;