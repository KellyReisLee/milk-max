import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';
import img1 from '@/assets/logo-reduzida-azul.png';
import img2 from '@/assets/loading.gif';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
     const [loading, setLoading] = useState(false);
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
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
            username: username,
            password: password
        };

        try {
            // Requisição POST para o backend
            const response = await fetch(routes.login, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    login(); // Atualiza o estado de autenticação no frontend
                    setMessage(data.message);
                    setTimeout(() => {
                        navigate('/vacas'); // Redireciona para a página de vacas após 2 segundos
                    }, 2000);
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage('Erro ao fazer login.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocorreu um erro ao tentar fazer login.');
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
                    <h2 className="title-form">Log in</h2>
                    <p>
                    Se você ainda não tem uma conta: <Link to="/signup">Registre-se</Link>
                    </p>
                    <form className="needs-validation" id="loginForm" onSubmit={handleSubmit} noValidate>
                        <div className="form-group">
                            <label htmlFor="username"></label>
                            <input
                                id="username"
                                name="username"
                                placeholder="Nome de usuário"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                            <div className="valid-feedback"></div>
                            <div className="invalid-feedback">Preencha o dado do usuário.</div>
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
                            <div className="invalid-feedback">Preencha a senha.</div>
                        </div>
                        <div className="text-center mb-4">
                            <p className="mt-4 mb-2 text-muted">Esqueci</p>
                            <Link to="/forgot/username" className="text-muted">Usuário</Link> /
                            <Link to="/forgot/password" className="text-muted">Senha</Link>
                        </div>
                        <button className="form-btn" type="submit">
                            <strong>ENTRAR</strong>
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

export default Login;