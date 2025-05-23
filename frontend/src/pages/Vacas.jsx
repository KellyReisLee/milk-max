import React, { useState, useEffect } from 'react';
import { config } from '../config';

function Vacas() {
    const [colunas, setColunas] = useState([]);
    const [vacas, setVacas] = useState([]);
    const [novaVaca, setNovaVaca] = useState({
        raca: '',
        nasc: '',
        peso: ''
    });
    const [message, setMessage] = useState('');
    const { routes } = config;

    // Função para calcular idade em anos e meses
    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        
        let years = today.getFullYear() - birth.getFullYear();
        let months = today.getMonth() - birth.getMonth();
        
        if (months < 0) {
            years--;
            months += 12;
        }
        
        if (years === 0) {
            return `${months} ${months === 1 ? 'mês' : 'meses'}`;
        } else if (months === 0) {
            return `${years} ${years === 1 ? 'ano' : 'anos'}`;
        } else {
            return `${years} ${years === 1 ? 'ano' : 'anos'} e ${months} ${months === 1 ? 'mês' : 'meses'}`;
        }
    };

    // Buscar dados das vacas ao carregar o componente
    useEffect(() => {
        fetchVacas();
    }, []);

    const fetchVacas = async () => {
        try {
            const response = await fetch(routes.vacas, {
                method: 'GET',
                credentials: 'include' // Para enviar cookies (necessário para autenticação)
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Modificar as colunas para mostrar "Idade" em vez de "Nascimento"
                    const modifiedColunas = data.colunas.map(col => 
                        col === 'nasc' ? 'idade' : col
                    );
                    setColunas(modifiedColunas);
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
            const response = await fetch(routes.cadastro, {
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
                            {linha.map((item, idx) => {
                                // Se for a coluna de nascimento (nasc), mostrar a idade
                                if (colunas[idx] === 'idade') {
                                    return <td key={idx}>{calculateAge(item)}</td>;
                                }
                                // Para outras colunas, manter o comportamento atual
                                return (
                                    <td key={idx}>
                                        {typeof item === "string" && item.match(/^\d{4}-\d{2}-\d{2}$/)
                                            ? item.split("-").reverse().join("/")
                                            : item}
                                    </td>
                                );
                            })}
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