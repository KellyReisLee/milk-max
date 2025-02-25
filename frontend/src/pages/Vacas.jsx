import React, { useState, useEffect } from 'react';

function Vacas() {
    const [colunas, setColunas] = useState([]);
    const [vacas, setVacas] = useState([]);
    const [novaVaca, setNovaVaca] = useState({
        raca: '',
        nasc: '',
        peso: ''
    });
    const [error, setError] = useState('');

    // Buscar dados das vacas ao carregar o componente
    useEffect(() => {
        fetchVacas();
    }, []);

    const fetchVacas = async () => {
        try {
            const response = await fetch('/vacas', {
                method: 'GET',
                credentials: 'include' // Para enviar cookies (necessário para autenticação)
            });

            if (response.ok) {
                const data = await response.json();
                setColunas(data.colunas);
                setVacas(data.vacas);
            } else {
                setError('Erro ao carregar dados das vacas.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Erro ao carregar dados das vacas.');
        }
    };

    // Cadastrar nova vaca
    const handleCadastrarVaca = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novaVaca),
                credentials: 'include'
            });

            if (response.ok) {
                fetchVacas(); // Recarrega os dados das vacas
                setNovaVaca({ raca: '', nasc: '', peso: '' });
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao cadastrar vaca.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Erro ao cadastrar vaca.');
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
                                    <td key={idx}>{item}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Formulário para cadastrar nova vaca */}
            <div className="container button">
                <button className="btn-login" onClick={() => setNovaVaca({ ...novaVaca, visible: true })}>
                    Cadastrar vaca
                </button>
                {novaVaca.visible && (
                    <form onSubmit={handleCadastrarVaca}>
                        <input
                            type="text"
                            id="raca"
                            name="raca"
                            placeholder="Raça"
                            value={novaVaca.raca}
                            onChange={(e) => setNovaVaca({ ...novaVaca, raca: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="nasc"
                            name="nasc"
                            placeholder="Nascimento (aaaa-mm-dd)"
                            value={novaVaca.nasc}
                            onChange={(e) => setNovaVaca({ ...novaVaca, nasc: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="peso"
                            name="peso"
                            placeholder="Peso"
                            value={novaVaca.peso}
                            onChange={(e) => setNovaVaca({ ...novaVaca, peso: e.target.value })}
                            required
                        />
                        <button className="btn-login" type="submit"> Cadastrar </button>
                    </form>
                )}
            </div>

            {/* Exibir mensagens de erro */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Vacas;