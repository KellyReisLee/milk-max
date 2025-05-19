import React from 'react';
import img1 from '@/assets/sponsors/farmers-market.png';
import img2 from '@/assets/sponsors/milky-cafe.png';
import img3 from '@/assets/sponsors/farm-2022.png';
import img4 from '@/assets/sponsors/farmers.png';
import img5 from '@/assets/sponsors/farmer-green-house.png';
import { SponsorsContainer, SponsorsTitle, SponsorImage } from './styles';

function Sponsors() {
  return (
    <SponsorsContainer>
      <div className="container-fluid">
        <SponsorsTitle>Parceiros</SponsorsTitle>
        <div className="row justify-content-center align-items-center gap-2">
          <div className="col-2 d-flex">
            <SponsorImage src={img1} alt="farmers-market-logo" />
          </div>
          <div className="col-2 d-flex justify-content-center">
            <SponsorImage src={img2} alt="milky-cafe-logo" />
          </div>
          <div className="col-2 d-flex justify-content-center">
            <SponsorImage src={img3} alt="farmer-2022-logo" />
          </div>
          <div className="col-2 d-flex justify-content-center">
            <SponsorImage src={img4} alt="farmers-logo" />
          </div>
          <div className="col-2 d-flex justify-content-center">
            <SponsorImage src={img5} alt="farmer-green-house-logo" />
          </div>
        </div>
      </div>
    </SponsorsContainer>
  );
}

export default Sponsors; 