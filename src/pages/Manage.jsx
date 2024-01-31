import React, { useContext, useEffect, useState} from "react";
import "../assets/css/Manage.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import rehberlikSag from "../img/rehberlik-sag.png";
import { GlobalContext } from "./GlobalState";
import { fetchData } from "../assets/api/dataFetching";

const Manage = () => {
  // Context api-dəki qlobal state-lər
  const {contextData , setContextData , lang } = useContext(GlobalContext);
  const [aboutText,setAboutText] = useState(lang === 'az' ? 'Haqqımızda' : 'About');
  const [manageImg , setManagaImg] = useState('')
  const { pathname } = useLocation();

 useEffect(() => {
  if(lang === 'az'){
    if(pathname === '/about/history'){
      setAboutText(`"Daşkəsən Dəmir Filiz" MMC`)
    }
    if(pathname === '/about/supervisory'){
      setAboutText('Müşahidə Şurası')
    }
    if(pathname === '/about/audit'){
      setAboutText('Maliyyə və Audit')
    }
    if(pathname === '/about/structure'){
      setAboutText('Struktur')
    }
    if(pathname === '/about/legislation'){
      setAboutText('Qanunvericilik')
    }
    if(pathname === '/about/reception-days'){
      setAboutText('Qəbul günləri')
    }

   }else{
    if(pathname === '/about/history'){
      setAboutText(`"Dashkasan Iron Ore" LLC`)
    }
    if(pathname === '/about/supervisory'){
      setAboutText('Supervisory Board')
    }
    if(pathname === '/about/audit'){
      setAboutText('Finance and Audit')
    }
    if(pathname === '/about/structure'){
      setAboutText('Structure')
    }
    if(pathname === '/about/legislation'){
      setAboutText('Legislation')
    }
    if(pathname === '/about/reception-days'){
      setAboutText('Reception days')
    }
   }
 }, [pathname,lang]);

  const a = document.querySelector('.links-div.active');

  // Tablara kliklənən zaman uyğun linkin innerText-nin Context APİ-ə göndərilməsi 
  const handleCclick = (e) => {
    setContextData(e.target.innerText);
    window.localStorage.setItem('aboutText', e.target.innerText);
  };

  // Tablara kliklənən zaman uyğun linkin aktivliyinin təmin edilməsi 
  useEffect(() => {
    const linksButton = document.querySelectorAll(".links-div");
    linksButton.forEach((item) => {
      item.addEventListener("click", function () {
        linksButton.forEach((rItem) => {
          rItem.classList.remove("active");
        });
        item.classList.add("active");
      });
    });

    if(pathname === '/about/history' && lang === 'az') {
      setContextData('"Daşkəsən Dəmir Filiz" MMC');
    }

    if(pathname === '/about/history' && lang === 'en') {
      setContextData('"Dashkasan Iron Ore" LLC');
    }
  }, [lang, pathname, setContextData]);

  useEffect(() => {
      
    fetchData(`${lang}/aboutimg`)
    .then((data) => setManagaImg(data.data));
  } , [lang])

  return (
    <>
      <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${manageImg.aboutimg})`}}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={aboutText}   />
        </div>
      </div>
      <img
        className="rehberlik-sag"
        style={{ position: "absolute", right: "0" }}
        src={rehberlikSag}
        alt="manage"
      />
      <div className="container pt-5 manages-container">
        <nav>
          <ul className="interior-nav">
            <Link to={"/"}>{lang === 'az' ? 'Ana Səhifə' : 'Main Page'}</Link>
            <span>&#8725;</span>
            <p>{a?.innerText}</p>
          </ul>
        </nav>
        <div className="d-flex row align-items-start flex-wrap aside-menu">
          <div
            className="col-lg-4 col-md-12 col-sm-12 nav-pills-my"
            data-aos="fade-down"
            data-aos-duration="1000"
          >
            <div className={`links-div ${(contextData === '"Daşkəsən Dəmir Filiz" MMC' || contextData === '"Dashkasan Iron Ore" LLC') ? 'active' : ''}`} onClick={handleCclick}>
              <Link to="history" className='my-link-class history' type="button">
                {lang === 'az' ? '"Daşkəsən Dəmir Filiz" MMC' : '"Dashkasan Iron Ore" LLC'}
              </Link>
            </div>
            {/* <div className={`links-div ${(contextData === 'Dəyər və Hədəflərimiz' || contextData === 'Values and Vision') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="values-vision"
                className='my-link-class mission'
                type="button"
                
              >
                {lang === 'az' ? 'Dəyər və Hədəflərimiz' : 'Values and Vision'}
              </Link>
            </div> */}
            {/* <div className={`links-div  ${(contextData === 'Rəhbərlik' || contextData === 'Management') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="management"
                className='my-link-class managment'
                type="button"
              >
                {lang === 'az' ? 'Rəhbərlik ' : 'Management'}
              </Link>
            </div> */}
            <div className={`links-div  ${(contextData === 'Müşahidə Şurası' || contextData === 'Supervisory Board') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="supervisory"
                className='my-link-class müşahidə'
                type="button"
              >
                {lang === 'az' ? 'Müşahidə Şurası' : 'Supervisory Board'}
              </Link>
            </div>

            <div className={`links-div  ${(contextData === 'Maliyyə və Audit' || contextData === 'Finance and Audit') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="audit"
                className='my-link-class müşahidə'
                type="button"
              >
                {lang === 'az' ? 'Maliyyə və Audit' : 'Finance and Audit'}
              </Link>
            </div>
            <div className={`links-div ${(contextData === 'Struktur' || contextData === 'Structure') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="structure"
                className='my-link-class structure'
                type="button"
                
              >
                {lang === 'az' ? 'Struktur ' : 'Structure'}
              </Link>
            </div>
            <div className={`links-div ${(contextData === 'Qanunvericilik' || contextData === 'Legislation') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="legislation"
                className='my-link-class'
                type="button"
                
              >
                {lang === 'az' ? 'Qanunvericilik ' : 'Legislation'}
              </Link>
            </div>
            <div className={`links-div ${(contextData === 'Qəbul günləri' || contextData === 'Reception days') ? 'active' : ''}`} onClick={handleCclick}>
              <Link
                to="reception-days"
                className='my-link-class'
                type="button"
                
              >
                {lang === 'az' ? 'Qəbul günləri ' : 'Reception days'}
              </Link>
            </div>
          </div>
          <Outlet />
          <div className="tab-content" id="v-pills-tabContent"></div>
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

export default Manage;
