import React from 'react';

function Testimonials() {
  return (
    // Testimonials
    <section id="testimonials" className="user-testimonials py-5">
        <div className="container text-center ">
            <h2>O que nossos usuários dizem</h2>
            <div className="row mt-4 py-5 ">
                {/* 1 - Card */}
                <div className="col-lg-4 col-md-12 p-3">
                    <div className="testimonial-card p-3 shadow-sm text-start">
                        <div className="testimonial-header d-flex gap-2 ">
                            <div className="testimonial-img">
                                <img
                                    className="img-fluid rounded-circle"
                                    src="/assets/testimonials-section/face-1.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h5 className="m-0">
                                    Gregory Jones <i className="fa-solid fa-circle-check" />
                                </h5>
                                <p className="twitter-text">@twitter_gregoryfarm</p>
                            </div>
                        </div>
                        <p className="content-testimonial">
                            " Consigo monitorar a saúde do rebanho, registrar a quantidade de
                            leite produzida e acompanhar os dados financeiros de forma prática
                            e acessível."
                        </p>
                        <p className="footer-testimonial m-0">8:21 PM / Dez 21, 2022</p>
                    </div>
                </div>
                {/* 2 - Card */}
                <div className="col-lg-4 p-3 col-md-12 ">
                    <div className="testimonial-card p-3 shadow-sm text-start">
                        <div className="testimonial-header d-flex gap-2 ">
                            <div className="testimonial-img">
                                <img
                                    className="img-fluid rounded-circle"
                                    src="/assets/testimonials-section/face-3.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h5 className="m-0">
                                    Sylvia Taylor <i className="fa-solid fa-circle-check  " />
                                </h5>
                                <p className="twitter-text">@twitter_sylviataygrow</p>
                            </div>
                        </div>
                        <p className="content-testimonial">
                            "A interface do software é extremamente intuitiva e fácil de usar,
                            o que facilitou muito a adaptação ao dia a dia da fazenda. Antes,
                            era difícil manter um registro detalhado e organizado do rebanho,
                            mas agora tenho controle total sobre cada animal e todas as etapas
                            da produção. "
                        </p>
                        <p className="footer-testimonial m-0">5:36 PM / Nov 07, 2023</p>
                    </div>
                </div>
                {/* 3 - Card */}
                <div className="col-lg-4 col-md-12 p-3">
                    <div className="testimonial-card p-3 shadow-sm text-start">
                        <div className="testimonial-header d-flex gap-2 ">
                            <div className="testimonial-img">
                                <img
                                    className="img-fluid rounded-circle"
                                    src="/assets/testimonials-section/face-2.jpg"
                                    alt=""
                                />
                            </div>
                            <div>
                                <h5 className="m-0">
                                    Jonathan Gutierrez{" "}
                                    <i className="fa-solid fa-circle-check  " />
                                </h5>
                                <p className="twitter-text">@twitter_jonathan372</p>
                            </div>
                        </div>
                        <p className="content-testimonial">
                            {" "}
                            "Excelente para monitorar a qualidade e produção diária. Me ajudou
                            a controlar melhor o volume de produção. Recomendo!"
                        </p>
                        <p className="footer-testimonial m-0">10:15 AM / Jul 04, 2024</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
}

export default Testimonials;