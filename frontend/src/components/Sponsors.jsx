import React from 'react';

function Sponsors() {
  return (
    // Sponsors
    <section className="sponsors-container bg-light">
        <div className="container-fluid">
        <p className="title-sponsors text-center my-0">Parceiros</p>
            <div className="row justify-content-center align-items-center gap-2">
                <div className="col-2 d-flex ">
                <img
                    className="img-fluid "
                    src="../assets/sponsors/farmers-market.png"
                    alt="farmers-market-logo"
                />
                </div>
                <div className="col-2 d-flex justify-content-center">
                <img
                    className="img-fluid "
                    src="../assets/sponsors/milky-cafe.png"
                    alt="milky-cafe-logo"
                />
                </div>
                <div className="col-2 d-flex justify-content-center">
                <img
                    className="img-fluid "
                    src="../assets/sponsors/farm-2022.png"
                    alt="farmer-2022-logo"
                />
                </div>
                <div className="col-2 d-flex justify-content-center">
                <img
                    className="img-fluid "
                    src="../assets/sponsors/farmers.png"
                    alt="farmers-logo"
                />
                </div>
                <div className="col-2 d-flex justify-content-center">
                <img
                    className="img-fluid "
                    src="../assets/sponsors/farmer-green-house.png"
                    alt="farmer-green-house-logo"
                />
                </div>
            </div>
        </div>
    </section>
  );
}

export default Sponsors;