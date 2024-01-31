import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Media.css";
import MediaNews from "../components/Media/MediaNews";
import MediaGalery from "../components/Media/MediaGalery";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MediaGaleryVideo from "../components/Media/MediaGaleryVideo";
import { fetchData } from "../assets/api/dataFetching";
import { GlobalContext } from "./GlobalState";

const Media = () => {
  const { lang } = useContext(GlobalContext);

  const [mediaImg, setMediaImg] = useState("");
  useEffect(() => {
    fetchData(`${lang}/mediaimg`).then((data) => setMediaImg(data.data));
  }, [lang]);

  return (
    <>
      <div
        className="heading-all"
        style={{ background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${mediaImg.mediaimg})` }}
      >
        <div className="container heading-all-container header-bg-respon">
          <Navbar title="Media" />
        </div>
      </div>
      <div className="media">
        <div className="container media-container">
          <div className="row media-row">
            <MediaNews />
          </div>
          <div className="row media-row">
            <MediaGalery />
          </div>
          <div className="row media-row">
            <MediaGaleryVideo />
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

export default Media;
