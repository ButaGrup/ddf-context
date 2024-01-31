import React, { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import '../assets/css/PurchaseDetail.css';
import kenar from '../img/rehberlik-sag.png'
import { GlobalContext } from "./GlobalState";
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useState } from "react";

const PurchaseDetail = () => {
  // Context api-dəki qlobal state-lər
  const { purchaseTitle, purchaseDesc, purchaseStartDate, purchaseEndDate, lang, purchaseData } = useContext(GlobalContext);
  const [purchImg, setPurchImg] = useState('')

  const { purchaseId } = useParams()

  const allData = purchaseData.desciriptions
  const isArchive = Boolean(allData.find(item => item.id === Number(purchaseId) && item.is_archiv === 1))




  useEffect(() => {
    fetchData(`${lang}/satimg`)
      .then((data) => setPurchImg(data.data));
  }, [lang])



  return (
    <>
      <div className="heading-all" style={{
        background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${purchImg.satimg})`
      }}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Satınalma' : 'Procurement'} />
        </div>
      </div>
      <section style={{ position: 'relative' }}>
        <img className="right-pic" src={kenar} alt="" />
        <div className="container purchase-detail-container mb-5 pt-5">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul className="project-detail-heading-link purchase-detail-header-link">
                  <Link to={"/"} style={{ marginRight: '5px' }}>{lang === 'az' ? 'Ana Səhifə' : 'Main Page'}</Link>
                  <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#x2215;</span>
                  {
                    isArchive ? <>
                      <Link to={'/purchase'}>{lang === 'az' ? 'Satınalma' : 'Procurement'}</Link>
                      <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#x2215;</span>
                      <Link to="/purchase" style={{ margin: '0 5px' }}>{lang === 'az' ? 'Satınalma Arxivi' : 'Procurement History'}</Link>
                    </> : <>
                      <Link to="/purchase" style={{ margin: '0 5px' }}>{lang === 'az' ? 'Satınalma' : 'Procurement'}</Link>
                      <span style={{ marginRight: '10px', marginLeft: '10px' }}>&#x2215;</span>
                      <li>{purchaseTitle} </li>
                    </>
                  }

                </ul>
              </nav>
              <p
                data-aos="fade-down"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="purchase-detail-title"
              >
                {purchaseTitle}

              </p>
              <div className="purch-detail-date my-4">
                <div
                  className="purch-detail-date-left"
                  data-aos="zoom-in"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="1000"
                >
                  <h4>Başlama tarixi:</h4>
                  <span>{purchaseStartDate}</span>
                </div>
                <div
                  className="purch-detail-date-right"
                  data-aos="zoom-in"
                  data-aos-anchor-placement="top-bottom"
                  data-aos-duration="1000"
                >
                  <h4>Son Müraciət tarixi:</h4>
                  <span>{purchaseEndDate}</span>
                </div>
              </div>
              <p
                data-aos="zoom-in"
                data-aos-anchor-placement="top-bottom"
                data-aos-duration="1000"
                className="purchase-detail-description"
                dangerouslySetInnerHTML={{ __html: purchaseDesc }}
              >

              </p>
            </div>
          </div>
        </div>
      </section>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default PurchaseDetail;