import React, { useState } from 'react';
import { config } from '../config';
import img2 from '@/assets/loading.gif';

function Relatorios() {
    const [colunas, setColunas] = useState([]);
    const [linhas, setLinhas] = useState([]);
    const [imgPaths, setImgPaths] = useState([]);
    const [option, setOption] = useState('');
    const [selecaoVaca, setSelecaoVaca] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { routes } = config;

    // Selecionar opção de visualização de relatórios
    const handleSubmit = async (e) => {
        
        // Previne comportamento padrão de formulário ao recarregar a página
        e.preventDefault();

        setLoading(true); // Mostra o ícone de carregamento

        const data = {
            option: option,
            select: selecaoVaca
        };

        try {
            // Requisição POST para o backend
            const response = await fetch(routes.relatorios, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            });
    
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setColunas(data.colunas);
                    setLinhas(data.linhas);
                    setImgPaths(data.img_paths);
                    setMessage(data.message);
                } else {
                    setMessage(data.message);
                    setColunas([]);
                    setLinhas([]);
                    setImgPaths([]);
                }
            } else {
                setMessage('Erro ao gerar relatórios.');
                setColunas([]);
                setLinhas([]);
                setImgPaths([]);
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Erro ao gerar relatórios.');
            setColunas([]);
            setLinhas([]);
            setImgPaths([]);
        } finally {
            setLoading(false); // Esconde o ícone de carregamento
        }
    };

    return (
        <div className="container mt-5 mb-5">
            <h2 className="text-center mb-4"><strong>Relatórios</strong></h2>

            {/* Formulário para selecionar opção */}
            <div className="container button">
                <form onSubmit={handleSubmit}>
                    <label className="radio">
                        <input
                            type="radio"
                            name="select"
                            value="all"
                            className="input-radio"
                            onChange={(e) => {
                                setOption(e.target.value);
                                setSelecaoVaca('');
                            }}
                        />
                        Panorâma geral: todas as vacas
                    </label>
                    <label className="radio">
                        <input
                            type="radio"
                            name="select"
                            value="select"
                            className="input-radio"
                            onChange={(e) => {
                                setOption(e.target.value);
                            }}
                        />
                        Selecionar vaca
                    </label>
                    {option === "select" && (
                        <input
                            type="number"
                            id="selecao_vaca"
                            name="selecao_vaca"
                            placeholder="ID vaca"
                            value={selecaoVaca}
                            onChange={(e) => setSelecaoVaca(e.target.value)}
                            required
                        />
                    )}
                    <button className="btn btn-click" type="submit"> Ver relatórios </button>
                </form>
            </div>
            {loading && (
            <div id="loading">
                <img id="loadingimg" src={img2} alt="Carregando..." />
            </div>
            )}

            {/* Escolha do usuário */}
            {message && (
                <div className="container mt-5">
                    <h3 className="text-center mb-4"><strong>{message}</strong></h3>
                </div>
            )}

            {/* Tabela de estatísticas */}
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
                        {linhas.map((linha, index) => (
                            <tr key={index}>
                                {linha.map((item, idx) => (
                                    <td key={idx}>{item}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Gráficos */}
            <div className="container mt-5 graph">
                {imgPaths.map((img, index) => {
                    const imgSrc = img.startsWith('data:image/png;base64,') ? img : `${config.backendUrl}/${img}`;
                    return (
                        <img key={index} src={imgSrc} alt={`Gráfico ${index + 1}`} />
                    );
                })}
            </div>
        </div>
    );
}

export default Relatorios;