import React from "react";
import '../assets/css/Manage.css'
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useState } from "react";
import { GlobalContext } from "./GlobalState";
import { useContext } from "react";


const Tariximiz = () => {
  // APİ-dən gələn datanın saxlanılması üçün State-dir
  const [historyData , setHistoryData] = useState([])
  // UseContext-dən gələn dilin saxlanılması və GlobalContextdən gələn datanı çəkmək üçün UseContext-dən istifadə edirik 
  const {lang} = useContext(GlobalContext);
  // Data-nı Api-dən çəkmək üçün UseEffectdən istifadə edirik


  useEffect(() => {
    fetchData(`${lang}/history`)
    .then((data) => setHistoryData(data.data));
  },[lang])
  return (
    <div className="col-md-8">
      <div
        class="tab-pane show"
        id="v-pills-home"
        role="tabpanel"
        aria-labelledby="v-pills-home-tab"
      >
      {/* Editordan gələn data tag-lərlə qarışıq olduğu üçün dangerouslyİnnerHtml istifadə etmişik */}
        <div dangerouslySetInnerHTML={{__html : historyData.content}} className="history-section">

        </div>
      </div>
    </div>
  );
};

export default Tariximiz;
