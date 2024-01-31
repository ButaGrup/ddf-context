import React, { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchData } from '../assets/api/dataFetching';
import '../assets/css/Musahide.css';
import { GlobalContext } from "./GlobalState";

const Müşahidə = () => {
  // Dil və Data-nı saxlamaq üçün state-lər
  const [musahideData , setMusahideData] = useState([])
  const {lang} = useContext(GlobalContext);

  // APİ-yə request atmaq üçün istifadə olunan useEffect
  useEffect(() => {
    fetchData(`${lang}/observation`)
    .then((data) => setMusahideData(data.data));
  },[lang])


  return (
    <div className='musahide col-md-8'>
        <div className="text1" dangerouslySetInnerHTML={{ __html : musahideData.musahide}}></div>
    </div>
  );
};

export default Müşahidə;