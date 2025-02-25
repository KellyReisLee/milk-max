import React, { useState } from 'react';

function Contato() {
    const [assunto, setAssunto] = useState('');
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [telefone, setTelefone] = useState('');
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
        formData.append('assunto', assunto);
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('telefone', telefone);
    
        try {
            // Requisição POST para o backend
            const response = await fetch('/contato', {
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
        <div className="wrapper mt-5 mb-5">
            <div className="form-container" style={{ marginBottom: '70px' }}>
                <h1 className="title-form">ENTRE EM CONTATO</h1>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            id="assunto"
                            name="assunto"
                            placeholder="Assunto"
                            value={assunto}
                            onChange={(e) => setAssunto(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            pattern="^\S+\s+\S+.*$"
                            placeholder="Nome Completo"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            id="email"
                            name="email"
                            pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            placeholder="Telefone (XX) XXXXX-XXXX"
                            pattern="^\d{2}\s?\d{4,5}\d{4}$"
                            value={telefone}
                            onChange={(e) => setTelefone(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <textarea
                            rows="5"
                            id="mensagem"
                            placeholder="Mensagem"
                            name="mensagem"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button className="form-btn" type="submit">
                        <strong>ENVIAR</strong>
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
    );
};

export default Contato;
