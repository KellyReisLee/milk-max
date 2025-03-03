import React, { useState, useEffect } from 'react';

function Vacas() {
    const [colunas, setColunas] = useState([]);
    const [vacas, setVacas] = useState([]);
    const [novaVaca, setNovaVaca] = useState({
        raca: '',
        nasc: '',
        peso: ''
    });
    const [message, setMessage] = useState('');
    const route = '/vacas';

    // Buscar dados das vacas ao carregar o componente
    useEffect(() => {
        fetchVacas();
    }, []);

    const fetchVacas = async () => {
        try {
            const response = await fetch(route, {
                method: 'GET',
                credentials: 'include' // Para enviar cookies (necessário para autenticação)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                setColunas(data.colunas);
                setVacas(data.vacas);
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage('Erro ao gerar tabela.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erro ao carregar dados das vacas.');
        }
    };

    // Cadastrar nova vaca
    const handleCadastrarVaca = async (e) => {
        
        // Previne comportamento padrão de formulário ao recarregar a página
        e.preventDefault();

        const data = {
            raca: novaVaca.raca,
            nasc: novaVaca.nasc,
            peso: novaVaca.peso,
        };

        try {
            const response = await fetch('/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    fetchVacas(); // Recarrega os dados das vacas
                    setNovaVaca({ raca: '', nasc: '', peso: '' });
                    setMessage(data.message);
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erro ao cadastrar vaca.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4"><strong>Minhas vacas</strong></h2>

            {/* Tabela com todas as vacas */}
            <div className="container mt-5">
                <table className="table table-bordered table-hover table-striped">
                    <thead>
                        <tr>
                            {colunas.map((coluna, index) => (
                                <th key={index}>{coluna}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                    {vacas.map((linha, index) => (
                        <tr key={index}>
                            {linha.map((item, idx) => (
                                <td key={idx}>
                                    {typeof item === "string" && item.match(/^\d{4}-\d{2}-\d{2}$/)
                                        ? item.split("-").reverse().join("/")
                                        : item}
                                </td>
                            ))}
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Formulário para cadastrar nova vaca */}
            <div className="container button">
                <button className="btn btn-click" onClick={() => setNovaVaca({ ...novaVaca, visible: true })}>
                    Cadastrar vaca
                </button>
                {novaVaca.visible && (
                    <form onSubmit={handleCadastrarVaca}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="raca"
                                name="raca"
                                placeholder="Raça"
                                value={novaVaca.raca}
                                onChange={(e) => setNovaVaca({ ...novaVaca, raca: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="nasc"
                                name="nasc"
                                placeholder="Nascimento (aaaa-mm-dd)"
                                value={novaVaca.nasc}
                                onChange={(e) => setNovaVaca({ ...novaVaca, nasc: e.target.value })}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="peso"
                                name="peso"
                                placeholder="Peso"
                                value={novaVaca.peso}
                                onChange={(e) => setNovaVaca({ ...novaVaca, peso: e.target.value })}
                                required
                            />
                        </div>
                        <button className="btn btn-click" type="submit"> Cadastrar </button>
                    </form>
                )}
            </div>

            {message && (
                    <div className="message mt-3" id="extra">
                        <p>{message}</p>
                    </div>
            )}
        </div>
    );
}

export default Vacas;