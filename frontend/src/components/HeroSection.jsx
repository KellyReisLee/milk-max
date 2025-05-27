import React from 'react';
import img1 from '@/assets/hero-image.jpg';

function HeroSection() {
  return (
    // Hero section
    <section className="container-hero container-fluid d-flex justify-content-center pb-lg-5 pb-0 bg-light">
        <div className="container d-flex flex-lg-row flex-column">
            <div className="col-lg-5 col-md-12 d-flex flex-column bg-light order-lg-1 order-2 justify-content-lg-start justify-content-center px-5 py-4 text-center text-lg-start">
                <h1 className="title-hero">Controle completo da sua criação, produção e do financeiro</h1>
                <p className="content-hero">Software de gestão de criação de gado e produção leiteira, ajudando pequenos produtores no acompanhamento da produção.</p>
                <a className="btn-hero align-self-lg-start align-self-center w-75 text-center" href="/cadastro">
                Comece Agora!
                </a>
                <a className="btn-hero align-self-lg-start align-self-center w-75 text-center" href="https://www.youtube.com/watch?v=jlaK1mqf2Ks">
                Apresentação Projeto
                </a>
                <a className="btn-hero align-self-lg-start align-self-center w-75 text-center" href="https://youtu.be/HrooH52G6nY">
                Apresentação das funcionalidades do site
                </a>
            </div>
            <div className="hero-img-container col-lg-6 col-md-12 order-lg-2 order-1 d-flex justify-content-center align-items-center">
                <img className="img-fluid w-100 h-100" src={img1} alt="" style={{ objectFit: 'cover', height: '100%' }} />
            </div>
        </div>
    </section>
  );
}

export default HeroSection;