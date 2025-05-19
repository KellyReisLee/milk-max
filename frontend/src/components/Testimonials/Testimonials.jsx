import React from 'react';
import img1 from '@/assets/testimonials-section/face-1.jpg';
import img2 from '@/assets/testimonials-section/face-3.jpg';
import img3 from '@/assets/testimonials-section/face-2.jpg';
import {
  TestimonialsContainer,
  TestimonialsTitle,
  TestimonialCard,
  TestimonialHeader,
  TestimonialImage,
  TestimonialName,
  TestimonialTwitter,
  TestimonialContent,
  TestimonialFooter
} from './styles';

function Testimonials() {
  return (
    <TestimonialsContainer id="testimonials">
      <div className="container text-center">
        <TestimonialsTitle>O que nossos usuários dizem</TestimonialsTitle>
        <div className="row mt-4 py-5">
          {/* 1 - Card */}
          <div className="col-lg-4 col-md-12 p-3">
            <TestimonialCard>
              <TestimonialHeader>
                <TestimonialImage>
                  <img src={img1} alt="" />
                </TestimonialImage>
                <div>
                  <TestimonialName>
                    Gregory Jones <i className="fa-solid fa-circle-check" />
                  </TestimonialName>
                  <TestimonialTwitter>@twitter_gregoryfarm</TestimonialTwitter>
                </div>
              </TestimonialHeader>
              <TestimonialContent>
                " Consigo monitorar a saúde do rebanho, registrar a quantidade de
                leite produzida e acompanhar os dados financeiros de forma prática
                e acessível."
              </TestimonialContent>
              <TestimonialFooter>8:21 PM / Dez 21, 2022</TestimonialFooter>
            </TestimonialCard>
          </div>

          {/* 2 - Card */}
          <div className="col-lg-4 p-3 col-md-12">
            <TestimonialCard>
              <TestimonialHeader>
                <TestimonialImage>
                  <img src={img2} alt="" />
                </TestimonialImage>
                <div>
                  <TestimonialName>
                    Sylvia Taylor <i className="fa-solid fa-circle-check" />
                  </TestimonialName>
                  <TestimonialTwitter>@twitter_sylviataygrow</TestimonialTwitter>
                </div>
              </TestimonialHeader>
              <TestimonialContent>
                "A interface do software é extremamente intuitiva e fácil de usar,
                o que facilitou muito a adaptação ao dia a dia da fazenda. Antes,
                era difícil manter um registro detalhado e organizado do rebanho,
                mas agora tenho controle total sobre cada animal e todas as etapas
                da produção."
              </TestimonialContent>
              <TestimonialFooter>5:36 PM / Nov 07, 2023</TestimonialFooter>
            </TestimonialCard>
          </div>

          {/* 3 - Card */}
          <div className="col-lg-4 col-md-12 p-3">
            <TestimonialCard>
              <TestimonialHeader>
                <TestimonialImage>
                  <img src={img3} alt="" />
                </TestimonialImage>
                <div>
                  <TestimonialName>
                    Jonathan Gutierrez <i className="fa-solid fa-circle-check" />
                  </TestimonialName>
                  <TestimonialTwitter>@twitter_jonathan372</TestimonialTwitter>
                </div>
              </TestimonialHeader>
              <TestimonialContent>
                "Excelente para monitorar a qualidade e produção diária. Me ajudou
                a controlar melhor o volume de produção. Recomendo!"
              </TestimonialContent>
              <TestimonialFooter>10:15 AM / Jul 04, 2024</TestimonialFooter>
            </TestimonialCard>
          </div>
        </div>
      </div>
    </TestimonialsContainer>
  );
}

export default Testimonials; 