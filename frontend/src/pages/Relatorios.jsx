import React, { useState } from 'react';

function Relatorios() {
    const [colunas, setColunas] = useState([]);
    const [linhas, setLinhas] = useState([]);
    const [imgPaths, setImgPaths] = useState([]);
    const [option, setOption] = useState('');
    const [selecaoVaca, setSelecaoVaca] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/relatorios', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ select: option, selecao_vaca: selecaoVaca }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    setColunas(data.colunas);
                    setLinhas(data.linhas);
                    setCount(data.count);
                    setImgPaths(data.img_paths);
                    setError('');
                } else {
                    setError(data.message || 'Erro ao gerar relatórios.');
                }
            } else {
                setError('Erro ao gerar relatórios.');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Erro ao gerar relatórios.');
        } finally {
            setLoading(false);
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
                            onChange={(e) => setOption(e.target.value)}
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
                    <button className="btn-login" type="submit"> Ver relatórios </button>
                </form>
            </div>

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
                {imgPaths.map((img, index) => (
                    <img key={index} src={img} alt={`Gráfico ${index + 1}`} />
                ))}
            </div>

            {/* Exibir mensagens de erro */}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default Relatorios;