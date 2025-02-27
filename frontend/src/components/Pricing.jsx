import React from 'react';

function Pricing() {
  return (
    // Princing
    <section id="prices" className="pricing-plans py-5 py-md-5 text-center bg-light">
        <div className="container">
            <h2 className="price-title m-2">Escolha seu plano</h2>
            <p className="price-title-content mb-5">
                Selecione o plano que melhor atende às necessidades de controle e
                gerenciamento da sua produção de leite.
            </p>
            <div className="row mt-4 justify-content-center align-items-center">
                {/* Plano Básico */}
                <div className="col-12 col-md-6 col-lg-4 mb-sm-3">
                    <div className="card pricing-card p-4 shadow-sm">
                        <h4 className="card-price-title mb-3">Básico</h4>
                        <h3 className="text-primary">R$9/mês</h3>
                        {/* <p>Para pequenos produtores que estão começando a digitalizar o controle de produção.</p> */}
                        <ul className="price-list list-unstyled d-flex flex-column gap-2">
                        <li>Relatórios básicos de produção</li>
                        <li>Até 10 cabeças de gado</li>
                        <li>5 GB de armazenamento</li>
                        <li>Suporte por e-mail</li>
                        </ul>
                        <button className="btn btn-primary mt-3">Escolher este plano</button>
                    </div>
                </div>
                {/* Plano Profissional */}
                <div className="col-12 col-md-6 col-lg-4  mb-sm-3">
                    <div className="card pricing-card p-4 shadow-sm">
                        <h4 className="card-price-title mb-3">Profissional</h4>
                        <h3 className="text-primary">R$29/mês</h3>
                        {/* <p>Para produtores em crescimento que precisam de maior controle e análise de dados.</p> */}
                        <ul className="price-list list-unstyled d-flex flex-column gap-2">
                        <li>Relatórios avançados de produção</li>
                        <li>Até 50 cabeças de gado</li>
                        <li>20 GB de armazenamento</li>
                        <li>Suporte por e-mail e chat</li>
                        </ul>
                        <button className="btn btn-primary mt-3">Escolher este plano</button>
                    </div>
                </div>
                {/* Plano Avançado */}
                <div className="col-12 col-md-6 col-lg-4   mb-sm-3 ">
                    <div className="card pricing-card p-4 shadow-sm">
                        <h4 className="card-price-title mb-3">Avançado</h4>
                        <h3 className="text-primary">R$49/mês</h3>
                        {/* <p>Para produtores estabelecidos que precisam de uma gestão completa e otimizada.</p> */}
                        <ul className="price-list list-unstyled d-flex flex-column gap-2">
                        <li>Relatórios personalizados e análise financeira</li>
                        <li>Até 200 cabeças de gado</li>
                        <li>50 GB de armazenamento</li>
                        <li>Suporte prioritário 24/7</li>
                        </ul>
                        <button className="btn btn-primary mt-3">Escolher este plano</button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    );
}

export default Pricing;
