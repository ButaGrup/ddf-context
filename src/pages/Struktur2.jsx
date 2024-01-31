import React, { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching.js";
import rehberlikClose from "../img/close2.png";
import { useState } from "react";
import '../assets/css/strukturModal.css';
import { GlobalContext } from "./GlobalState.jsx";
import { useContext } from "react";



const Struktur = () => {
// Structurda olan datanı və dili saxlamaq üçün state-lər və Struktur şəklini böyütmək üçün istifadə edilən state
  const [structureData , setStructureData] = useState([])
  const {lang} = useContext(GlobalContext);
  const [structerOpen , setStructureOPen] = useState(false)


  // Açılan pop up -n bağlanması üçün istifadə edilən funksiya
  const handleClose = () => {
    setStructureOPen(false);
  };


  // datanı api-dən çəkmək üçün useEffect
  useEffect(() => {
    fetchData(`${lang}/structer`)
    .then((data) => setStructureData(data.data));
  },[lang])



  return (
    <div>
      <div
        class="tab-pane"
        id="v-pills-settings"
        role="tabpanel"
        aria-labelledby="v-pills-settings-tab"
      >
        <img onClick={() => {setStructureOPen(true)}} className="structure-png" src={structureData.struktur} alt=""/>
      </div>

      {structerOpen && (
        <div
       className='rehberlik-overlay'
       onClick={handleClose}
       >
         <div
           class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
           style={{ height: "100vh", margin: "0 auto", top: "0", position: 'relative', borderRadius: '10px' }}
           onClick={(e) =>  e.stopPropagation()}
         >
           <div
             class="modal-content"
             style={{ background: '#EBEBEB', borderRadius: '10px'}}
           >
             <div class="modal-header" style={{ padding: '21px 21px 10px 21px', backgroundColor: '#EBEBEB'}}>
               <div class='rehberlik-modal-close ms-auto' onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px'  }}>
                 <img src={rehberlikClose} alt="rehberlik-close" />
               </div>
             </div>
             <div class="modal-body" style={{ padding: '10px 10px' }}>
               <img src={structureData.struktur} alt="" />
             </div>
           </div>
         </div>
       </div>
      )}
    </div>
  );
};

export default Struktur;
