import React from "react";
import { useContext } from "react";
import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { GlobalContext } from "./GlobalState";
import '../assets/css/RehberlikModal.css';
import { useState } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useEffect } from "react";

const RehberlikDetail = () => {
    const { lang, rehberlikData } = useContext(GlobalContext);
    // Hər rəhbərə uyğun datanı İD-vasitəsi ilə almaq üçün useParams-dan istifadə edirik
    const { rehberlikId } = useParams();
    const rehberlikDetailData = rehberlikData.find(item => item.id === Number(rehberlikId));
    const [manageImg , setManagaImg] = useState('')

    console.log(rehberlikData)

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
                <Navbar title={lang === "az" ? "Rəhbərlik" : "Manegement"} />
            </div>
        </div>

        <div style={{ margin: "50px auto", top: "0", position: "relative" }}>
            <div>
            <div style={{ padding: "10px 0" }}>
                <div
                className="container"
                style={{ maxWidth: "940px", width: "100%", height: "100%" }}
                >
                <div className="row" style={{ height: "100%" }}>
                    <div className="col-lg-4 pt-3" style={{ height: "100%" }}>
                    <div
                        style={{ width: "100%", height: "100%" }}
                        className="d-flex align-items-center justify-content-center"
                    >
                        <div style={{ width: "300px", height: "394px" }}>
                        <img
                            src={rehberlikDetailData.img}
                            alt={rehberlikDetailData.full_name}
                            style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            }}
                        />
                        </div>
                    </div>
                    </div>
                    <div className="col-lg-8 pt-3" style={{ height: "100%" }}>
                        <p className="rehberlik-modal-name text-lg-start">{rehberlikDetailData.full_name}</p>
                        <p className="rehberlik-modal-title text-lg-start">{rehberlikDetailData.position}</p>
                        <div className="rehberlik-modal-description text-start"
                            dangerouslySetInnerHTML={{ __html: rehberlikDetailData.descripton }}
                        >
                        </div>
                    </div>
                </div>
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

export default RehberlikDetail;