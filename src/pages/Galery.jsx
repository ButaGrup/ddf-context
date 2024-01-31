import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { GlobalContext } from "./GlobalState";
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useState } from "react";

const Galery = () => {
    // Context api-dəki qlobal state-lər
    const { galeryText, setGaleryText , lang } = useContext(GlobalContext);
    const [galleryImg , setGalleryImg] = useState('')

    const handleVideoGalery = (e) => {
        setGaleryText(e.target.innerText);
        window.localStorage.setItem('galeryText', e.target.innerText);
    };

    useEffect(() => {
        fetchData(`${lang}/mediaimg`)
        .then((data) => setGalleryImg(data.data));
      } , [lang])

    return (
        <>
        <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${galleryImg.mediaimg})`}}>
            <div className="container heading-all-container header-bg-respon">
            <Navbar title={lang === 'az' ? 'Qalereya' : 'Gallery'} />
            </div>
        </div>
        <div className="galery">
            <div className="container galery-container">
            <div className="row galery-row">
                <div className="galery-header">
                <h3 style={{ marginTop: "15px" }}>{lang === 'az' ? 'Qalereya' : 'Gallery'} </h3>
                <div className="galery-tabs">
                    <Link
                        to="photos"
                        onClick={handleVideoGalery}
                        className={
                            (galeryText === "Foto Qalereya" || galeryText === 'Photo Gallery' || galeryText === "Qalereya") ? "active" : "disactive"
                        }
                    >
                      {lang === 'az' ? 'Foto Qalereya' : 'Photo Gallery'}
                    </Link>
                    <Link
                        to="videos"
                        onClick={handleVideoGalery}
                        className={
                            (galeryText === "Video Qalereya" || galeryText === "Video Gallery") ? "active" : "disactive"
                        }
                    >
                     {lang === 'az' ? 'Video Qalereya' : 'Video Gallery'}
                    </Link>
                </div>
                <Outlet />
                </div>
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

export default Galery;
