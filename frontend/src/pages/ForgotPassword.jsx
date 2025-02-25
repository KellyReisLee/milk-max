import React, { useState } from 'react';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validação do formulário
    const form = e.target;
    if (!form.checkValidity()) {
      e.stopPropagation();
      form.classList.add('was-validated');
      return;
    }

    setLoading(true); // Mostra o ícone de carregamento

    // Dados do formulário
    const formData = new FormData();
    formData.append('email', email);

    try {
        // Requisição POST para o backend
        const response = await fetch('/forgot/password', {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        
        if (data.success) {
            setMessage(data.message); // Mostrar mensagem de sucesso
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
                    <img id="loadingimg" src="../assets/loading.gif" alt="Carregando..." />
                </div>
                )}
                {message && (
                <div className="mt-3" id="extra">
                    <p>{message}</p>
                </div>
                )}
            </div>
        </div>
    </div>
  );
}

export default ForgotPassword;