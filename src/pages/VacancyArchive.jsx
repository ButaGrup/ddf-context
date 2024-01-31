import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import VacancyHistory from '../components/Vacancy/VacancyHistory';
import { GlobalContext } from './GlobalState';
import '../assets/css/Vacancy.css';
import { useEffect } from 'react';
import { fetchData } from '../assets/api/dataFetching';
import { useState } from 'react';

const VacancyArchive = () => {
    // Context api-dəki qlobal state-lər
    const { lang,vacancyData } = useContext(GlobalContext);
    const [archiveImg , setArchiveImg] = useState('')

    let vacancyHistoryData = [];

    // Request zamanı gələn dataları Vakansiya Arxivi Array-nə ayırır
    for (const key in vacancyData) {
        if (vacancyData[key].archive === 1) {
            vacancyHistoryData.push({ ...vacancyData[key] });
        } 
    }

    useEffect(() => {
        fetchData(`${lang}/karyeraimg`)
        .then((data) => setArchiveImg(data.data));
      } , [lang])

    return (
        <>
            <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${archiveImg.karyeraimg})`}}>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={lang === "az" ? "Vakansiya arxivi" : "Vacancy archive"} />
                </div>
            </div>
            <div className="container vacancy-archive-container">
            <div className="row vacancy-row gy-4">
                {vacancyHistoryData.map((vacancyItem) => (
                  <div className="col-lg-4 col-md-6" key={vacancyItem.id}>
                    <VacancyHistory
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
            </div>
            <div className="section-footer-bg pd-b">
                <div className="container custom-container">
                    <Footer />
                </div>
            </div>
        </>
    );
};

export default VacancyArchive;