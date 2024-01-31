import React, { useEffect, useState } from "react";
import '../assets/css/strukturModal.css';
import { GlobalContext } from "./GlobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../assets/api/dataFetching";

const Rehberlik = () => {
  // Rəhbərliyin datasını GlobalContextdən yığırıq və global state-ləri gətiririk componentə
  const { lang, rehberlikData } = useContext(GlobalContext);
  const [structureData,setStructureData] = useState([]);

  useEffect(() => {
    window.localStorage.setItem('rehberlikData', JSON.stringify(rehberlikData));
  }, [rehberlikData]);

  useEffect(() => {
    fetchData(`${lang}/structure`)
      .then((data) => setStructureData(data.data));
  }, [lang]);

  return (
    <>
      <div className="col-lg-8">
        <div
          className="tab-pane row manage-main-cont-str"
          id="v-pills-profile"
          role="tabpanel"
          aria-labelledby="v-pills-profile-tab"
        >
          {/* Gələn datanı map-ə salıb Uİ-da əks etdiririk */}
          <h1>{lang === 'az' ? 'Rəhbərlik' : 'Management'}</h1>
          {rehberlikData.map((item) => (
            <div className="manage-container col-lg-4 mt-3" key={item.id}>
              <div className="manage-card-wrapper">
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
            </div>
          ))}
        </div>

        <div className="manage-main-cont-str">
          <h1 style={{marginBottom: '15px'}}>{lang === 'az' ? 'Struktur bölmə rəhbərləri' : 'Unit heads'}</h1>
          <div className="structur-container row">
            {structureData.map((item) => (
              <div className="second-structr col-md-6 mt-3" key={item.id}>
                <Link to={`/about/structure/${item.id}`} className="second-str-inner">
                  <img src={item.img} alt="" />
                  <div className="struc-det">
                    <p>{item.sobe}</p>
                    <h2>{item.full_name}</h2>
                    <p>{item.position}</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};

export default Rehberlik;