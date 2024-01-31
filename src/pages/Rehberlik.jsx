import React, { useEffect } from "react";
import '../assets/css/RehberlikModal.css';
import { GlobalContext } from "./GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";

const Rehberlik = () => {
  // Rəhbərliyin datasını GlobalContextdən yığırıq və global state-ləri gətiririk componentə
  const { lang, rehberlikData } = useContext(GlobalContext);

  useEffect(() => {
    window.localStorage.setItem('rehberlikData', JSON.stringify(rehberlikData));
  }, [rehberlikData]);

  return (
    <>
      <div className="col-lg-8">
        <div
          className="tab-pane row manage-main-cont"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
        >
          {/* Gələn datanı map-ə salıb Uİ-da əks etdiririk */}
          {rehberlikData.map((item) => (
            <div className="manage-container col-lg-4" key={item.id}>
              <div className="img-sec">
                <img
                  src={item.img}
                  alt=""
                />
              </div>
              <div className="detail-sec">
                <h1
                  className="header-h1"
                >
                  {item.full_name}
                </h1>
                <h2
                  className="header-h2"
                >
                  {item.position}
                </h2>
              </div>
              <div
                className="position-sec"
              >
              {/* Rəhbərlərin daxili səhifəsinə aparmaq üçün link */}
                <Link
                  to={`/about/management/${item.id}`}
                  className="manage-more"
                  id="rehberlik-modal-active"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  {lang === 'az' ? 'Ətraflı' : 'More'}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

    </>
  );
};

export default Rehberlik;