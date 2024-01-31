import React, { useContext, useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import { fetchData } from '../assets/api/dataFetching';
import { GlobalContext } from './GlobalState';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';

const StrukturDetail = () => {
    const { lang, rehberlikData } = useContext(GlobalContext);
    const [manageImg , setManagaImg] = useState('');
    const { structureId } = useParams();
    const [structureData,setStructureData] = useState([]);

    const structureDetailData = structureData.find(item => item.id === Number(structureId)) || {
        id: null,
        full_name: '',
        position: '',
        sobe: '',
        img: '',
        descripton: ''
    };

    useEffect(() => {  
        fetchData(`${lang}/aboutimg`)
        .then((data) => setManagaImg(data.data));
    } , [lang]);

    const tempDiv = document.createElement('div');

    tempDiv.innerHTML = structureDetailData.description;

    useEffect(() => {
        fetchData(`${lang}/structure`)
        .then((data) => setStructureData(data.data));
    }, [lang]);

    return (
        <>
            <div className="heading-all" style={{background: `linear-gradient(180deg,
                rgba(0, 0, 0, 0.7) 0%,
                rgba(0, 0, 0, 0) 49.48%,
                rgba(0, 0, 0, 0.7) 100%),URL(${manageImg.aboutimg})`}}>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={lang === "az" ? "Struktur bölmə rəhbərləri" : "Unit heads"} />
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
                                        src={structureDetailData.img}
                                        alt={structureDetailData.full_name}
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
                                <p className="rehberlik-modal-name text-lg-start">{structureDetailData.full_name}</p>
                                <p className="rehberlik-modal-title text-lg-start"><b>{structureDetailData.sobe}</b></p>
                                <p className="rehberlik-modal-title text-lg-start">{structureDetailData.position}</p>
                            <div className="rehberlik-modal-description text-start"
                                dangerouslySetInnerHTML={{ __html: tempDiv.innerText }}
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
    )
}

export default StrukturDetail