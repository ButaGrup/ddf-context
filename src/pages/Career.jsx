import React, { useContext, useEffect, useState } from "react";
import Footer from "../components/Footer";
import "../assets/css/Career.css";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import muraciet from '../img/muraciet.png'
import vakansiya from '../img/vakansiya.png'
import { GlobalContext } from "./GlobalState";
import { fetchData } from "../assets/api/dataFetching";

const Career = () => {
  // Context api-dəki qlobal state
  const {lang} = useContext(GlobalContext);

  // State
  const [careerData,setCareerData] = useState({ content: '' });
  const [careerImg , setCareerImg] = useState('')

  // APİ-yə request atmaq üçün istifadə olunan useEffect
  useEffect(() => {
    fetchData(`${lang}/carier`)
      .then((data) => setCareerData(data.data));
  }, [lang]);

  useEffect(() => {
    fetchData(`${lang}/karyeraimg`)
    .then((data) => setCareerImg(data.data));
  } , [lang])
  
  return (
    <>
      <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${careerImg.karyeraimg})`}}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Karyera' : 'Career'} />
        </div>
      </div>
      <div className="careers">
        <div className="container heading-all-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="career-content" dangerouslySetInnerHTML={{ __html: careerData.content }}> 
              </div>
            </div>
          </div>
        </div>

        <div className="container heading-all-container">
        <div className="row career-items">
        <Link onClick={() => window.scrollTo(0,0)} className="career-item-link2" exact to="/vacancies">
            <div
              className="career-image2"
              data-aos="zoom-in"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
            >
            <img src={vakansiya} alt="" />
              <p className="link-p">{
                lang === 'az' ? 'Vakansiyalar' : 'Vacancies'
              }</p>
            </div>
          </Link>
          <Link onClick={() => window.scrollTo(0,0)} className="career-item-link1" exact to="/apply">
            <div
              className="career-image1"
              data-aos="zoom-in"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="500"
            >
            <img src={muraciet} alt="" />
              <p className="link-p">{lang === 'az' ? 'Müraciət' : 'Apply'}</p>
            </div>
          </Link>
        </div>
        </div>

      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Career;
