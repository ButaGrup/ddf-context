import React, { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import vector3 from "../img/vacancy/vector3.svg";
import subtractUp from "../img/vacancy/subtractUp.svg";
import subtractDown from "../img/vacancy/subtractDown.svg";
import "../assets/css/Vacancy.css";
import Footer from "../components/Footer";
import VacancyItems from "../components/Vacancy/VacancyItems";
import { GlobalContext } from "./GlobalState";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchData } from "../assets/api/dataFetching";
import Pagination from "../components/Pagination/Pagination";

const Vacancy = () => {
  // Context api-dəki global state-lər
  const { vacancyData, lang, setVacancyData } = useContext(GlobalContext);

  // State-lər
  const [isFilter, setIsFilter] = useState(false);
  const [inputType, setInputType] = useState("text");
  const [inputType2, setInputType2] = useState("text");
  const [vacancyName,setVacancyName] = useState('');
  const [startDate,setStartDate] = useState('');
  const [endDate,setEndDate] = useState('');
  const [vacancyImg,setVacancyImg] = useState('');

  let vacancyAnnounceData = [];
  let vacancyHistoryData = [];


  // Request zamanı gələn dataları Vakansiya Elanları və Vakansiya Arxivi şəklində iki Array-e ayırır
  for (const key in vacancyData) {
    if (vacancyData[key].archive === 0) {
      vacancyAnnounceData.push({ ...vacancyData[key] });
    } else {
      vacancyHistoryData.push({ ...vacancyData[key] });
    }
  }

  // Endpointlər 
  let data = new FormData();
  data.append('work_name',vacancyName);
  data.append('start_d',startDate);
  data.append('end_d',endDate);

  // Forumdakı məlumatları doldurub axtarış buttonuna klikləyən zaman Vakansiya Elanlarını, vakansiyanın adı, başlama tarixi və son müraciət tarixinə görə filerləyən funksiya
  const handleVacancyFilterSubmit = (e) => {
    e.preventDefault();
    fetchData(`${lang}/filter/?work_name=${vacancyName}&start_d=${startDate}&end_d=${endDate}`)
    .then((data) => (
      setVacancyData(data.data)
    ));
  };


  useEffect(() => {
    window.localStorage.setItem("vacancyData", JSON.stringify(vacancyData));
  }, [vacancyData]);

  useEffect(() => {
    fetchData(`${lang}/karyeraimg`)
    .then((data) => setVacancyImg(data.data));
  } , [lang])


  // Filter buttonuna klikləyən zaman alt sectionda filterləmə formunun bağlanmasını təmin edir
  const handleFilterDown = () => {
    setIsFilter(false);
  };

  // Filter buttonuna klikləyən zaman alt sectionda filterləmə formunun açılmasını təmin edir
  const handleFilterUp = () => {
    setIsFilter(true);
  };

  // Filterləmə formundakı vakansiyanın başlama tarixinə fokuslanıb inputun tipini "date" edir
  const handleFocus = () => {
    setInputType("date");
  };

  // Filterləmə formundakı vakansiyanın başlama tarixini date-dən "text" edir
  const handleBlur = () => {
    setInputType("text");
  };

  // Filterləmə formundakı vakansiyanın son müraciət tarixinə fokuslanıb inputun tipini "date" edir
  const handleFocus2 = () => {
    setInputType2("date");
  };

  // Filterləmə formundakı vakansiyanın başlama tarixini date-dən "text" edir
  const handleBlur2 = () => {
    setInputType2("text");
  };

  const [currentPage , setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = vacancyAnnounceData.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(vacancyAnnounceData.length / recordsPerPage)

  return (
    <>
      <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${vacancyImg.karyeraimg})`}}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === "az" ? "Vakansiyalar" : "Vacancies"} />
        </div>
      </div>
      <div className="vacancy">
        <div className="empty-vacancy"></div>
        <div className="container vacancy-container">
          <div className="vacancy-items">
            <div className="vacancy-items-header">
              {isFilter ? (
                <div className="vacancy-dropdown">
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "center",
                    }}
                  >
                    <button
                      className="vacancy-items-filter"
                      onClick={handleFilterDown}
                    >
                      Filter
                      <img src={subtractUp} alt="subtractUp" />
                    </button>
                  </div>
                  <form className="row vacancy-selects" onSubmit={handleVacancyFilterSubmit}>
                    <div
                      className="col-lg-4 col-6 gy-3"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500"
                    >
                      <input 
                        value={vacancyName} 
                        onChange={(e) => setVacancyName(e.target.value)} 
                        placeholder={lang === 'az' ? "Vakansiya adı" : "Vacancy name"}
                      />
                    </div>
                    <div
                      className="col-lg-4 col-6 gy-3"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500"
                    >
                      <input
                        onChange={(e) => setStartDate(e.target.value)}
                        placeholder={lang === 'az' ? "Vakansiyanın başlama tarixi" : "Start date of vacancy"}
                        type={inputType}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div
                      className="col-lg-4 col-6 gy-3"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500"
                    >
                      <input
                        onChange={(e) => setEndDate(e.target.value)}
                        placeholder={lang === 'az' ? "Vakansiyanın son müraciət tarixi" : "End date of vacancy"}
                        type={inputType2}
                        onFocus={handleFocus2}
                        onBlur={handleBlur2}
                      />
                    </div>
                    <div
                      className="col-12 gy-3 d-flex justify-content-end"
                      data-aos="zoom-in"
                      data-aos-anchor-placement="top-bottom"
                      data-aos-duration="500"
                    >
                      <button type="submit" className="vacancy-filter-button">
                        {lang === "az" ? "Axtar" : "Search"}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <button
                  className="vacancy-items-filter"
                  onClick={handleFilterUp}
                >
                  Filter
                  <img src={subtractDown} alt="subtractDown" />
                </button>
              )}
            </div>
            <div className="row vacancy-row gy-4">
              {currentRecords.map((vacancyItem) => (
                <div className="col-lg-4 col-md-6" key={vacancyItem.id}>
                  <VacancyItems
                    id={vacancyItem.id}
                    title={vacancyItem.name}
                    description={vacancyItem.description}
                    startDate={vacancyItem.start_date}
                    endDate={vacancyItem.end_date}
                    sections={vacancyItem.sections}
                    work_qraf={vacancyItem.work_qraf}
                    salary={vacancyItem.salary}
                  />
                </div>
              ))}
            </div>
            <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage } />
            <div className="vacancy-items-history">
              <Link 
                style={{ textAlign: 'center' }}
                to={`/vacancies/vacancy-history`}
                className="vacancy-items-history-button"
              >
                {lang === "az" ? "Vakansiya arxivi" : "Vacancy archive"}
              </Link>
            </div>
            
          </div>
        </div>
        <div className="vacancy-img">
          <img src={vector3} className="img-fluid" alt="vector3" />
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

export default Vacancy;
