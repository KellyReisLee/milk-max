import React, { useState, useEffect } from 'react';

function Diario() {
    const [colunas, setColunas] = useState([]);
    const [dias, setDias] = useState([]);
    const [selecaoVaca, setSelecaoVaca] = useState('');
    const [novoRegistro, setNovoRegistro] = useState({
        id_vaca: '',
        dia: '',
        ciclo: '',
        leite_qtdd: '',
        leite_temp: '',
        leite_ph: ''
    });
    const [message, setMessage] = useState('');
    const route = '/diario';

    // Buscar dados do diário ao selecionar uma vaca
    const handleSelecionarVaca = async (e) => {
        
        // Previne comportamento padrão de formulário ao recarregar a página
        e.preventDefault();

        const data = {
            seletor: selecaoVaca
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
                    setColunas(data.colunas);
                    setDias(data.dias);
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage('Não há registros no diário dessa vaca.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erro ao buscar diário.');
        }
    };

    // Adicionar novo registro no diário
    const handleAdicionarRegistro = async (e) => {
        
        // Previne comportamento padrão de formulário ao recarregar a página
        e.preventDefault();

        const data2 = {
            registro: novoRegistro
        };

        try {
            // Requisição POST para o backend
            const response = await fetch('/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data2),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    // Atualizar tabela com os dados retornados
                    setColunas(data.colunas);
                    setDias(data.dias);
                    setNovoRegistro({
                        id_vaca: '',
                        dia: '',
                        ciclo: '',
                        leite_qtdd: '',
                        leite_temp: '',
                        leite_ph: ''
                    });
                    setMessage('');
                } else {
                    setMessage(data.message);
                }
            } else {
                setMessage('Erro ao adicionar registro.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erro ao adicionar registro.');
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4"><strong>Diário</strong></h2>

            {/* Formulário para selecionar vaca */}
            <div className="container button">
                <form onSubmit={handleSelecionarVaca}>
                    <input
                        type="number"
                        id="selecao_vaca"
                        name="selecao_vaca"
                        placeholder="ID vaca"
                        value={selecaoVaca}
                        onChange={(e) => setSelecaoVaca(e.target.value)}
                        required
                    />
                    <button className="btn btn-click" type="submit"> Ver diário </button>
                </form>
            </div>

            {/* Tabela do diário */}
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
                    {dias.map((linha, index) => (
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

            {/* Formulário para adicionar registro */}
            <div className="container button">
                <button className="btn btn-click" onClick={() => setNovoRegistro({ ...novoRegistro, visible: true })}>
                    Registrar no diário
                </button>
                {novoRegistro.visible && (
                    <form onSubmit={handleAdicionarRegistro}>
                        <input
                            type="number"
                            id="id_vaca"
                            name="id_vaca"
                            placeholder="ID vaca"
                            value={novoRegistro.id_vaca}
                            onChange={(e) => setNovoRegistro({ ...novoRegistro, id_vaca: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="dia"
                            name="dia"
                            placeholder="Data (aaaa-mm-dd)"
                            value={novoRegistro.dia}
                            onChange={(e) => setNovoRegistro({ ...novoRegistro, dia: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="ciclo"
                            name="ciclo"
                            placeholder="Ciclo reprodutivo"
                            value={novoRegistro.ciclo}
                            onChange={(e) => setNovoRegistro({ ...novoRegistro, ciclo: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="leite_qtdd"
                            name="leite_qtdd"
                            placeholder="Quantidade de leite"
                            value={novoRegistro.leite_qtdd}
                            onChange={(e) => setNovoRegistro({ ...novoRegistro, leite_qtdd: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="leite_temp"
                            name="leite_temp"
                            placeholder="Temperatura do leite"
                            value={novoRegistro.leite_temp}
                            onChange={(e) => setNovoRegistro({ ...novoRegistro, leite_temp: e.target.value })}
                            required
                        />
                        <input
                            type="text"
                            id="leite_ph"
                            name="leite_ph"
                            placeholder="pH do leite"
                            value={novoRegistro.leite_ph}
                            onChange={(e) => setNovoRegistro({ ...novoRegistro, leite_ph: e.target.value })}
                            required
                        />
                        <button className="btn btn-click" type="submit"> Adicionar registro </button>
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

export default Diario;