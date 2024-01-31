import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../assets/api/dataFetching.js";
import '../assets/css/Qanunvericilik.css';
import Pagination from "../components/Pagination/Pagination.jsx";
import qanunClose from '../img/close2.png';
import { GlobalContext } from "./GlobalState";

const Qanunvericilik = () => {
  // Qanunvericilik datalarını saxlamaq üçün state-lər
  const [qanunTitle, setQanunTitle] = useState("");
  const [qanunDesc, setQanunDesc] = useState("");
  const [showQanun, setShowQanun] = useState(false);
  const [showPdf,setShowPdf] = useState(false);
  const [pdf,setPdf] = useState('');
  const [legislationData, setLegislationData] = useState([]);
  const { lang } = useContext(GlobalContext);

  const [currentPage , setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

  // Foto Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = legislationData.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(legislationData.length / recordsPerPage);

  // Api-dən datanı çəkmək üçün UseEffect
  useEffect(() => {
    fetchData(`${lang}/legislation`)
      .then((data) => setLegislationData(data.data));
  }, [lang])

  //Qanunların açılan popup-ların açılması üçün istifadə edilən funksiya 
  const handleClick = (text, desc, pdf1) => {
    setQanunTitle(text);
    setQanunDesc(desc);

    if(desc) {
      setShowQanun(true);
    }

    if(pdf1){
      setShowPdf(true);
      setShowQanun(false);
      setPdf(pdf1);
    }
  };

  //Qanunların açılan popup-ların bağlanması üçün istifadə edilən funksiya 
  const handleClose = () => {
    setShowQanun(false);
    setShowPdf(false);
  };

  return (
    <>
      <div className="col-12 col-md-8 col-sm-12">
        <div
          className="tab-pane"
          id="v-pills-last"
          role="tabpanel"
          aria-labelledby="v-pills-settings-tab"
        >
          <div className="legislation-section">
          {currentRecords.map((item) => (
              (item.url === null && item.description === "") ? <div
                key={item.id}
                className="legislation-divs"
                // data-aos="zoom-in-up"
                // data-aos-duration="1000"
                onClick={handleClick.bind(null, item.title, item.description, item.pdff)}
              >
                <div className="legislation-div">
                  <div className="div-detail">
                    <Link id="popup" to="#">
                      {item.title}
                    </Link>
                  </div>
                  <div className="div-icon">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 19.5H13.6479V9.61593L4.12064 19.1432H0.446009V15.4208L10.0147 5.85211H0V0.5H19V19.5Z" />
                    </svg>
                  </div>
                </div>
              </div> : (item.url === "" && item.pdff === null) ? <div
                key={item.id}
                className="legislation-divs"
                // data-aos="zoom-in-up"
                // data-aos-duration="1000"
                onClick={handleClick.bind(null, item.title, item.description, item.pdff)}
              >
                <div className="legislation-div">
                  <div className="div-detail">
                    <Link id="popup" to="#">
                      {item.title}
                    </Link>
                  </div>
                  <div className="div-icon">
                    <svg
                      width="19"
                      height="20"
                      viewBox="0 0 19 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M19 19.5H13.6479V9.61593L4.12064 19.1432H0.446009V15.4208L10.0147 5.85211H0V0.5H19V19.5Z" />
                    </svg>
                  </div>
                </div>
              </div>
                  : 
                <a href={item.url} key={item.id} target='_blank' rel="noreferrer">
                  <div className="legislation-div">
                    <div className="div-detail">
                      <a href={item.url} target='_blank' rel="noreferrer">
                        {item.title}
                      </a>
                    </div>
                    <div className="div-icon">
                      <svg
                        width="19"
                        height="20"
                        viewBox="0 0 19 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19 19.5H13.6479V9.61593L4.12064 19.1432H0.446009V15.4208L10.0147 5.85211H0V0.5H19V19.5Z" />
                      </svg>
                    </div>
                  </div>
                </a>

            ))}
            <div className="more-btn">
              {/* <button className="more">{lang === 'az' ? 'Daha Çox' : 'More'}</button> */}
              <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage } />
            </div>
          </div>
        </div>
      </div>
      {showQanun && !showPdf && <div
        className='qanunvericilik-overlay'
        onClick={handleClose}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
          style={{ height: "100vh", margin: "0 auto", top: "0", backgroundColor: '#fff' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="modal-content"
            style={{ height: "100vh", borderRadius: "0" }}
          >
            <div className="modal-header" style={{ padding: '27px 40px', backgroundColor: '#f7f7f7' }}>
              <h5 className="modal-title">
                {qanunTitle}
              </h5>
              <div className='qanun-modal-close' onClick={handleClose}>
                <img src={qanunClose} alt="qanunClose" />
              </div>
            </div>
            <div className="modal-body"  style={{ padding: '10px 40px' }} dangerouslySetInnerHTML={{ __html: qanunDesc }}>
            </div>
          </div>
        </div>
      </div>}
      {showPdf && <div
        className='qanunvericilik-overlay'
        onClick={handleClose}
      >
        <div
          className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
          style={{ height: "100vh", margin: "0 auto", top: "0", backgroundColor: '#fff' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="modal-content"
            style={{ height: "100vh", borderRadius: "0" }}
          >
            <div className="modal-header" style={{ padding: '27px 40px', backgroundColor: '#f7f7f7' }}>
              <h5 className="modal-title">
                {qanunTitle}
              </h5>
              <div className='qanun-modal-close' onClick={handleClose}>
                <img src={qanunClose} alt="qanunClose" />
              </div>
            </div>
            <div className="modal-body">
              <iframe src={pdf} style={{width: '100%', height: '100%'}} frameBorder="0"></iframe>
            </div>
          </div>
        </div>
      </div>}
    </>
  );
};

export default Qanunvericilik;