import React from 'react';

function Features() {
  return (
    // Features
    <section id="features" className="features-container container-fluid">
        <div className="container py-4 py-md-5">
            <div className="row py-4 py-md-5">
            {/* Card 1 */}
            <div className="col-lg-4 col-md-6 mb-4 ">
                <div className="h-100">
                    <div className="row justify-content-center">
                        <div className="col-1 py-3  h-100   d-flex justify-content-center ">
                            <h5 className="card-title">
                                <i className="icon-feature fa-solid fa-check fa-lg" />{" "}
                            </h5>
                        </div>
                        <div className="col-8 ml-0">
                            <div className="card-body">
                                <h5 className="card-title">Gestão de Ordenha</h5>
                                <p className="card-text">
                                Controle detalhado da ordenha, incluindo produção diária por
                                animal e qualidade do leite.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card 2 */}
            <div className="col-lg-4 col-md-6 mb-4">
                <div className=" h-100">
                    <div className="row justify-content-center">
                        <div className="col-1 py-3  h-100   d-flex justify-content-center ">
                            <h5 className="card-title">
                                <i className="icon-feature fas fa-hand-holding-heart fa-lg" />
                            </h5>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Gestão da Saúde</h5>
                                <p className="card-text">
                                Registre dados de saúde e vacinas de cada animal, incluindo
                                exames e tratamentos.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card 3 */}
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="h-100">
                    <div className="row justify-content-center">
                        <div className="col-1 py-3  h-100 d-flex justify-content-center ">
                            <h5 className="card-title">
                                <i className="icon-feature fas fa-shield fa-lg " />{" "}
                            </h5>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Alimentação e Nutrição</h5>
                                <p className="card-text">
                                Controle a alimentação e a suplementação de cada vaca.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card 4 */}
            <div className="col-lg-4 col-md-6 mb-4">
                <div className=" h-100">
                    <div className="row justify-content-center">
                        <div className="col-1 py-3  h-100 d-flex justify-content-center ">
                            <h5 className="card-title">
                                <i className="icon-feature  fas fa-medal fa-lg" />{" "}
                            </h5>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Qualidade do Leite</h5>
                                <p className="card-text">
                                Registre e acompanhe os parâmetros de qualidade do leite,
                                como teor de gordura e proteína.{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card 5 */}
            <div className="col-lg-4 col-md-6 mb-4">
                <div className=" h-100">
                    <div className="row justify-content-center">
                        <div className="col-1 py-3  h-100  d-flex justify-content-center ">
                            <h5 className="card-title">
                                <i className="icon-feature fas fa-chart-line fa-lg" />{" "}
                            </h5>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Análises Financeiras</h5>
                                <p className="card-text">
                                Gere relatórios financeiros e de produtividade para tomada
                                de decisão.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Card 6 */}
            <div className="col-lg-4 col-md-6 mb-4">
                <div className="h-100">
                    <div className="row justify-content-center">
                        <div className="col-1 py-3  h-100 d-flex justify-content-center ">
                            <h5 className="card-title">
                                <i className="icon-feature  fas fa-chart-column fa-lg" />{" "}
                            </h5>
                        </div>
                        <div className="col-8">
                            <div className="card-body">
                                <h5 className="card-title">Produção Diária</h5>
                                <p className="card-text">
                                Monitore a quantidade de leite produzido diariamente por
                                cada vaca ou grupo.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    </section>
  );
}

export default Features;