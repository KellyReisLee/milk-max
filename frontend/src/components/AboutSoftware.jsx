import React from 'react';

function AboutSoftware() {
  return (    
    // About the software
    <section id="about" className="about-company  text-center bg-light">
        <div className="container-fluid  py-5">
            <div className="container">
                <h2>Sobre o Software</h2>
                <p>
                    Nosso software foi desenvolvido especialmente para apoiar pequenos
                    produtores de leite na gestão e no controle de suas produções diárias.
                </p>
                {/* 1º Row */}
                <div className="row justify-content-center text-start  my-5 py-lg-5">
                    <div className="col-lg-5 justify-content-between align-items-center mx-3">
                        <div className="primary-benefit showcase">
                            <img
                            src="/assets/about-section/about-2.jpg"
                            alt="image-about-2"
                            />
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <div className="primary-benefit showcase">
                            <h4 className="about-subtitle">Objetivo</h4>
                            <p>
                            Com uma interface intuitiva e relatórios claros, ajudamos o
                            produtor a tomar decisões mais informadas, a aumentar a
                            produtividade e a garantir a qualidade do leite. Nosso objetivo
                            é oferecer uma solução prática e acessível que faça a tecnologia
                            trabalhar a favor do produtor, aumentando a eficiência e,
                            principalmente, a rentabilidade da produção.
                            </p>
                        </div>
                    </div>
                </div>
                {/* 2º row */}
                <div className="row justify-content-center text-start  my-3 py-lg-5">
                    <div className="col-lg-5 justify-content-between align-items-center mx-3 order-2 order-lg-1">
                        <div className="primary-benefit showcase ">
                            <h4 className="about-subtitle">Proposta</h4>
                            <p>
                            Sabemos que o dia a dia no campo é desafiador e que cada detalhe
                            na criação de animais e na produção de leite faz a diferença.
                            Nossa ferramenta facilita o acompanhamento da saúde do rebanho,
                            o registro da quantidade de leite produzida, o controle de
                            qualidade e a análise de dados financeiros.
                            </p>
                        </div>
                    </div>
                    <div className="col-lg-5  order-1 order-lg-2">
                        <div className="primary-benefit showcase">
                            <img
                            src="/assets/about-section/about-1.jpg"
                            alt="image-about-1"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default AboutSoftware;