import React from "react";
import "../../assets/css/Vacancy.css";
import group55 from "../../img/vacancy/group55.svg";
import group65 from "../../img/vacancy/group65.svg";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../pages/GlobalState";

const VacancyItems = ({
  title,
  description,
  startDate,
  endDate,
  id,
  work_qraf,
  sections,
  salary
}) => {

  // State
  const [isHover, setIsHover] = useState(false);

  // Context API-dəki qlobal state-lər
  const { setVacancyDetailData , lang } = useContext(GlobalContext);

  // Vakaniyan;n descriptionu-nu qısa şəkildə göstərən funksiya
  var shortVacancyDescription = description;
  if(shortVacancyDescription.length > 100) shortVacancyDescription = shortVacancyDescription.substring(0,100);

  // Kursorun vakansiyaların üzərinə gəldikdə hover effektinin tətbiqi 
  const handleHover = () => {
    setIsHover((prev) => !prev);
  };

  return (
    <>
      <Link 
        className="vacancy-item-link"
        to={`/vacancies/${id}`} 
        style={{ color: 'rgba(24, 25, 24, 1)' }}
        onClick={() => {
          window.scrollTo(0,0);
          let a = {
            id: id,
            name: title,
            description: description,
            start_date: startDate,
            end_date: endDate,
            work_qraf: work_qraf,
            sections: sections,
            salary: salary
          }
          setVacancyDetailData(a);
          window.localStorage.setItem('vacancyDetailData', JSON.stringify(a))
        }} 
      >
        <div
          className="vacancy-item"
          onMouseEnter={handleHover}
          onMouseLeave={handleHover}
          data-aos="zoom-in"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="1000"
        >
          <p className="vacancy-title">{title}</p>
          <p className="vacancy-date" style={{ display: 'flex', flexDirection: 'column' }}>
            <span><b>{lang === 'az' ? 'Yerləşdirilmə tarixi:' : 'Start date:'} </b>{startDate}</span> 
            <span><b>{lang === 'az' ? 'Bitmə tarixi:' : 'End date:'} </b>{endDate}</span>
          </p>
          

          <div className="vacancy-more">
            <img src={!isHover ? group55 : group65} alt="group45" />
           {lang === 'az' ? ' Daha çox' : 'More'}
          </div>
        </div>
      </Link>
    </>
  );
};

export default VacancyItems;