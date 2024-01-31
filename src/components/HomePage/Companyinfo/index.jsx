import "./style.css";
import intersect from "../../../img/Intersect.webp";
import helmet from "../../../img/helmet.png";
import { useEffect,useState } from "react";
import { fetchData } from "../../../assets/api/dataFetching.js";
import { GlobalContext } from "../../../pages/GlobalState";
import { useContext } from "react";

function Companyinfo() {
    const [homeAboutData,setHomeAboutData] = useState({
        main_title: {
            title: ''
        },
        desciriptions: []
    });
    const {lang} = useContext(GlobalContext);


    useEffect(() => {
        fetchData(`${lang}/statistika`)
        .then((data) => setHomeAboutData(data.data));
    }, [lang]);

    return (
        <div className="company-info">
            <div className="main-info">
                {/* <div className="main-info-header">
                    <h2
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                    >
                        {lang === 'az' ? '“Daşkəsən Dəmir Filizi”' : '"Dashkasan Iron Ore"'}
                    </h2>
                    <p
                        data-aos="fade-right"
                        data-aos-duration="1000"
                        className="main-info-description"
                        dangerouslySetInnerHTML={{ __html: homeAboutData.main_title.title }}
                    >
                    </p>
                </div> */}
                <div className="main-info-content">
                  
                        <div
                            data-aos="fade-right"
                            data-aos-duration="1000"
                            className="main-info-content-inner-div"
                        >
                            <img src={helmet} alt="ikon"/>
                            <div className="main-info-content-rigth">
                                <h3 className="me-4">
                                   {homeAboutData.title}
                                </h3>
                                <div className="work-hours-div">
                                    <h2 className="work-hour-h">{homeAboutData.number}</h2>
                                    {/* <h3>{homeAboutData.date}</h3> */}
                                </div>
                            </div>
                        </div>
                    
                </div>
            </div>
            <img 
                src={intersect}
                className="section-img" 
                alt="" 
            />
        </div>
    );
}

export default Companyinfo;
