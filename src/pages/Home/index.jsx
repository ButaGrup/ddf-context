import React, { useContext } from "react";
import Footer from "../../components/Footer";
import Companyinfo from "../../components/HomePage/Companyinfo";
import Headerbox from "../../components/HomePage/Headerbox";
import HomeFooterImg from "../../components/HomePage/HomeFooterImg";
import HomeNews from "../../components/HomePage/HomeNews";
// import Mine from "../../components/HomePage/Mine";
import Navbar from "../../components/Navbar";
import "./style.css";
import { GlobalContext } from "../GlobalState";

const Home = () => {
  // Preloader state-i
  const { background} = useContext(GlobalContext);

  // Preloader-i 3 saniyə işlək vəziyyətdə saxlayan funksiya


  
  return (
      
        <>
          <div className="App" style={{backgroundImage: `url(${background.main_img})`}}>
            <div style={{ height: '350px', background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0) 50.06%)' }}>
              <Navbar />
            </div>
            <div style={{ display: 'flex', padding: '50px 0' }}>
              <div style={{ flex: '1' }}></div>
              <div style={{ maxWidth: '940px', width: '100%', padding: '0 10px' }}>
                <Headerbox />
              </div>
              <div style={{ flex: '1' }}></div>
            </div>
          </div>
          <div className="section-bg">
            <div className="container custom-container">
              <Companyinfo />
            </div>
          </div>
          <div className="section-news-bg">
            <div className="container custom-container">
              <HomeNews />
            </div>
          </div>
          {/* <div className="section-footer-bg footer-bg pd-mine">
            <div className="container mine-container">
              <Mine />
            </div>
          </div> */}
          <div className="section-footer-bg footer-bg">
            <div className="container custom-container">
              <HomeFooterImg />
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

export default Home;
