import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { config } from '../config';
import img1 from '@/assets/logo-reduzida-azul.png';


function Signup() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [message, setMessage] = useState('');
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

        // Dados do formulário
        const data = {
            email: email,
            username: username,
            password: password,
            confirm: confirm,
        };

        try {
            // Requisição POST para o backend
            const response = await fetch(routes.signup, {
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
                        navigate('/login'); // Redireciona para a página de login após 3 segundos
                    }, 3000);
                } else {
                    setError(data.message);
                }
            } else {
                setMessage('Erro ao tentar fazer cadastro.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Ocorreu um erro ao tentar fazer cadastro.');
        }
    };

    return (
        <div className="wrapper">
            <div className="login-container">
                <div className="login-img">
                    <img src={img1} alt="" />
                </div>
                <div className="divisor" />
                <div className="form-container">
                    <h2 className="title-form">Registre-se</h2>
                    <p>
                        Se você já tem uma conta: <Link to="/login">Log In</Link>
                    </p>
                    <form className="needs-validation" id="signupForm" onSubmit={handleSubmit} noValidate="">
                        <div className="form-group">
                            <label htmlFor="email" />
                            <input
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                type="email"
                                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Insira seu melhor e-mail.</div>
                        </div>
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
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Insira um nome de usuário.</div>
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
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Preencha a senha.</div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm" />
                            <input
                                id="confirm"
                                name="confirm"
                                placeholder="Confirmar senha"
                                type="password"
                                value={confirm}
                                onChange={(e) => setConfirm(e.target.value)}
                                required=""
                            />
                            <div className="valid-feedback" />
                            <div className="invalid-feedback">Confirme a senha.</div>
                        </div>
                        <button className="form-btn mt-4" type="submit">
                        <strong>REGISTRAR</strong>
                        </button>
                    </form>
                    {message && (
                    <div className="mt-3 message " id="extra">
                        <p>{message}</p>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Signup;
