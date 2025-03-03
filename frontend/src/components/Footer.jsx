import React from 'react';

function Footer() {
    return (
        // Footer
        <footer className="footer-container container-fluid d-flex justify-content-center flex-column align-items-center">
            <div className="row container d-flex py-3 px-0 gap-lg-0 gap-2 align-items-center justify-content-between flex-column flex-lg-row">
                <div className="col-lg-4 col-md-12 d-flex align-items-center py-2 order-1 order-md-1 gap-3 py-md-2 justify-content-lg-end justify-content-center justify-content-end">
                    <h3 className="subtitle-footer d-flex align-self-end">Siga-nos</h3>
                    <div className="footer-icon-list">
                        <a href="#" className="icon" aria-label="Facebook">
                            <i className="fa-brands fa-facebook fa-md"></i>
                        </a>
                        <a href="#" className="icon" aria-label="Instagram">
                            <i className="fa-brands fa-instagram fa-md"></i>
                        </a>
                        <a href="#" className="icon" aria-label="Twitter">
                            <i className="fa-brands fa-twitter fa-md"></i>
                        </a>
                        <a href="#" className="icon" aria-label="YouTube">
                            <i className="fa-brands fa-youtube fa-md"></i>
                        </a>
                    </div>
                </div>
                <div className="col-lg-7 col-md-12 d-flex py-2 justify-content-start flex-lg-row flex-column d-flex align-items-center gap-lg-3 gap-sm-2">
                    <h3 className="subtitle-footer d-flex align-self-center align-self-lg-end">NewsLetter</h3>
                    <div className="subscribe-container">
                        <form id="subscribeForm">
                            <input type="email" className="subscribe-input" name="subscribeInput" placeholder="Your email address" required />
                            <button className="subscribe-button" type="button">Inscreva-se</button>
                        </form>
                    </div>
                </div>
            </div>

        <hr className="hr-footer" />

        <nav className="footer-nav">
            <ul>
            <li className="nav-links-footer"><a href="/#features">Funcionalidades</a></li>
            <li className="nav-links-footer"><a href="/#about">Sobre</a></li>
            <li className="nav-links-footer"><a href="/#testimonials">Testemunhos</a></li>
            <li className="nav-links-footer"><a href="/contato">Contato</a></li>
            </ul>
        </nav>

        <p className="copyright"> © 2024 Milkmax. Todos os direitos reservados.</p>
        </footer>
    );
}

export default Footer;