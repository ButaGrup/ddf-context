import React, { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { GlobalContext } from "./GlobalState";
import '../assets/css/Mission.css';

const Mission = () => {
  // Tabları dəyişmək üçün state , Dil və Datanı saxlamaq üçün istifadə olunan state-lər
  const [isActive,setIsActive] = useState(true);
  const [misVisData,setMisVisData] = useState([]);
  const {lang} = useContext(GlobalContext) 

  const handleMisActiveButton = () => {
    setIsActive(true);
  };    


  const handleVisActiveButton = () => {
    setIsActive(false);
  };    

  // api-dən datanı əlavə etmək üçün istifadə olunan useEffect
  useEffect(() => {
    fetchData(`${lang}/misVis`)
    .then((data) => setMisVisData(data.data));
  },[lang])

  return (
    <div className="col-lg-8 col-md-12 col-sm-12 misVis-wrapper">
      <div className="misVis-buttons">
        <button className={`${isActive ? "mis-button accctive" : "mis-button"}`} onClick={handleMisActiveButton}>{lang === 'az' ? 'Dəyərlərimiz' : 'Our values'}</button>
        <button className={`${isActive ? "vis-button" : "vis-button accctive"}`} onClick={handleVisActiveButton}>{lang === 'az' ? 'Hədəflərimiz' : 'Vision'}</button>
      </div> 
      {isActive && 
        <div 
          className="mt-4 list-style-disc" 
          dangerouslySetInnerHTML={{ __html: misVisData.mission }}
          data-aos="zoom-in"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
        >
        </div>} 
      {!isActive && 
        <div 
          className="mt-4 list-style-disc" 
          dangerouslySetInnerHTML={{ __html: misVisData.vision }}
          data-aos="zoom-in"
          data-aos-anchor-placement="top-bottom"
          data-aos-duration="500"
        >
        </div>}
    </div> 
  );
};

export default Mission;
