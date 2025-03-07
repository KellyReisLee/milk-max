import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import img1 from '@/assets/logo-reduzida-azul.png';
import img2 from '@/assets/loading.gif';

function RedefSenha() {
    const { token } = useParams(); // Obtém o token passado na URL
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

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

        // Dados do formulário
        const data = {
            confirm: confirm,
            password: password,
            token: token
        };

        try {
            // Requisição POST para o backend
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/reset_password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setMessage(data.message);
                    setTimeout(() => {
                        navigate('/login'); // Redireciona para a página de login após 2 segundos
                    }, 2000);
                } else {
                    setMessage(data.message); // Exibe mensagem de erro
                }
            } else {
                setMessage('Erro ao processar solicitação'); // Exibe mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocorreu um erro ao tentar redefinir a senha.');
        }
    };

    return (
        <div className="wrapper">
            <div className="login-container">
                <div className="login-img">
                    <img src={img1} alt="Logo" />
                </div>
                <div className="divisor"></div>
                <div className="form-container">
                    <h2 className="title-form">Redefinir Senha</h2>
                    <form className="needs-validation" id="resetPasswordForm" onSubmit={handleSubmit} noValidate>
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
                            <div className="invalid-feedback">Insira a senha.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword"></label>
                            <input
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirmar Senha"
                            type="password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
                            />
                            <div className="valid-feedback"></div>
                            <div className="invalid-feedback">Confirme a senha.</div>
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
                    <div className="mt-3 message" id="extra">
                        <p>{message}</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default RedefSenha;