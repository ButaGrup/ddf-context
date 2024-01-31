import React, { Suspense, useContext, useState} from "react";
import "./style.css";
import { Link } from "react-router-dom";
import logo from "../../img/logo.png";
import search from "../../img/search.svg";
import { GlobalContext } from "../../pages/GlobalState";
import { useEffect } from "react";
import logo_en from '../../img/logo_en.png';



function Navbar(props) {

  // State-lər
  const [searchIcon, setSearchIcon] = useState(false);
  const [menu, setMenu] = useState(true);

  // Context API-dəki qlobal state-lər
  const { setContextData , setGaleryText , setLang , lang , setSearchData   } = useContext(GlobalContext);

  // Axtarılan məlumatın innerText-nin qlobal state-ə atılması 
  const getSearchValue = (e) =>{
    const searcInput = document.querySelector('.search-input')
    window.localStorage.setItem('searchText',searcInput.value);
    setSearchData(searcInput.value);
  }

  // Menu itemlərə kliklənən zaman onların innerText-nin qlobal state-ə atılması
  const getContextData = (e) => {
    setContextData(e.target.innerText); 
    document.querySelector(".responsive-menu").style.top = "-100vh";
    setMenu(true);
    window.localStorage.setItem('aboutText', e.target.innerText);
  }
  const handleGaleryContext = (e) => {
    setGaleryText(e.target.innerText);
  };

  // Dil dəyişməsi zamanı innerText-nin qlobal state-ə göndərilməsi 
  const getChangeLang = (e) => {
    setLang(e.target.innerText === 'AZE' ? 'az' : 'en');
    localStorage.setItem('lang' , e.target.innerText === 'AZE' ? 'az' : 'en')
    window.location.reload()
  }

  // Dil dəyişməsi zammanı hansı dil olduğunu yoxlayan funksiya
  useEffect(() => {
    let langData = localStorage.getItem('lang');
    if(langData){
      setLang(langData);
    }else{
      localStorage.setItem('lang' , lang);
      setLang('az');
    }

  },[lang, setLang]);



  const getSearchItem = () => {
    if (!searchIcon) {
      document.querySelector(".search-form").style.top = "0px"
      document.querySelector(".search-close-btn").style.top = "50px"
      setSearchIcon(true)
      document.querySelector(".responsive-menu").style.top = "-100vh"
      setMenu(true)
    } else {
      document.querySelector(".search-form").style.top = "-100vh"
      document.querySelector(".search-close-btn").style.top = "-100vh"
      setSearchIcon(false)
    }
  }

  // Responsive Menu
  const getChangeMenu = (e) => {
    if (menu) {
      setMenu(false)
      document.querySelector(".responsive-menu").style.top = "0px"

    } else {
      document.querySelector(".responsive-menu").style.top = "-100vh"
      setMenu(true)
    }
  }

  return (
    <Suspense fallback='Loading...'>
      <div className="nav-bar-custom nav-gradient">
        <nav style={{ maxWidth: '980px', width: '100%', padding: '0 10px', gap: '30px' }}>
          <div className="responsive-logo d-flex">
            <div className="logo">
              <Link to="/">
                <img className="logo-img" src={lang === 'az' ? logo : logo_en} alt="Logo" />
              </Link>
            </div>
            <button className="responsive-btn" onClick={getChangeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z" />
              </svg>
            </button>
          </div>
          <div className="responsive-menu">
            <button className="close-btn" onClick={getChangeMenu}> <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
            </svg></button>
            <ul className="menu-list">
              <li className="main-page-li">
                <Link to="/">
                  {lang === 'az' ? "Ana Səhifə" : 'Home Page'}
                </Link>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/about/history"
                >
                  {lang === 'az' ? "Haqqımızda" : 'About us'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/about/history"
                    onClick={getContextData}
                  >
                    {lang === 'az' ? `"Daşkəsən Dəmir Filiz" MMC` : '"Dashkasan Iron Ore" LLC'}
                  </Link>
                  {/* <Link
                    to="/about/values-vision"
                    onClick={getContextData}
                  >
                   {lang === 'az' ? "Dəyər və Hədəflərimiz" : 'Values and Vision'}
                  </Link> */}
                  {/* <Link
                    to="/about/management"
                    onClick={getContextData}
                  >
                   {lang === 'az' ? "Rəhbərlik" : 'Management'}
                  </Link> */}
                  <Link
                    to="/about/supervisory"
                    onClick={getContextData}
                  >
                    {lang === 'az' ? "Müşahidə Şurası" : 'Supervisory Board'}
                  </Link>
                  
                  <Link
                    to="/about/audit"
                    onClick={getContextData}
                  >
                   {lang === 'az' ? "Maliyyə və Audit" : 'Finance and Audit'}
                  </Link>
                  <Link
                    to="/about/structure"
                    onClick={getContextData}
                  >
                   {lang === 'az' ? "Struktur" : 'Structure'}
                  </Link>
                  <Link
                    to="/about/legislation"
                    onClick={getContextData}
                  >
                    {lang === 'az' ? "Qanunvericilik" : 'Legislation'}
                  </Link>
                  <Link
                    to="/about/reception-days"
                    onClick={getContextData}
                  >
                    {lang === 'az' ? "Qəbul günləri" : 'Reception days'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/activity"
                >
                  {lang === 'az' ? "Fəaliyyət" : 'Activity'}
                </Link>
                {/* <div className="drop-menu">
                  <Link
                    to="/mines"
                  >
                    {lang === 'az' ? "Yataqlar" : 'Mines'}
                  </Link>
                  <Link
                    to="#!"
                  >
                    Statistika
                  </Link>
                </div> */}
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/purchase"
                >
                  {lang === 'az' ? "Satınalma" : 'Procurement'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/purchase/purchase-announce"
                  >
                    {lang === 'az' ? "Satınalma elanları" : 'Procurement announcements'}
                  </Link>
                  <Link
                    to="/purchase/purchase-archive"
                  >
                    {lang === 'az' ? "Satınalma arxivi" : 'Procurement archive'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/media"
                >
                  {lang === 'az' ? "Media" : 'Media'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/media/news"
                  >
                    {lang === 'az' ? "Xəbərlər" : 'News'}
                  </Link>
                  <Link
                    to="/media/gallery/photos"
                    onClick={handleGaleryContext}
                  >
                    {lang === 'az' ? "Qalereya" : 'Gallery'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/career"
                >
                  {lang === 'az' ? "Karyera" : 'Career'}
                </Link>
                <div className="drop-menu">
                  <Link
                    to="/vacancies"
                  >
                    {lang === 'az' ? "Vakansiyalar" : 'Vacancies'}
                  </Link>
                  <Link
                    to="/apply"
                  >
                    {lang === 'az' ? "Müraciət" : 'Apply'}
                  </Link>
                </div>
              </li>
              <li className="nav-item-custom">
                <Link
                  to="/contact"
                >
                  {lang === 'az' ? "Əlaqə  " : 'Contact'}
                </Link>
              </li>
            </ul>
            <button className="search-btn" onClick={getSearchItem}><img src={search} alt="search icon" /></button>
            <div className="page-lang">
              <span onClick={getChangeLang}>AZE</span>
              <span onClick={getChangeLang}>ENG</span>
              {/* <ul className="lang-option">
                <li onClick={getChangeLang}>{lang === 'az' ? 'ENG' : 'AZE'}</li>
              </ul> */}
            </div>
          </div>
        </nav>
      </div>
      <div className="container heading-all-container">
        <p className="heading-title">{props.title}</p>
      </div> 
      <form action="/search" className="search-form">
        <input onChange={getSearchValue} type="text" className="search-input" placeholder={lang === 'az' ? "Axtarış..." : "Search..."} />
        <Link to={'/search'} onClick={getSearchValue} className="search-btn" style={{ marginLeft: '15px', width: '30px' }}><img style={{ width: '100%' }} src={search} alt="search icon" /></Link>
      </form>

      <button className="search-close-btn" onClick={getSearchItem}><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
      </svg>
      </button>
    </Suspense>
  );
}

export default Navbar;