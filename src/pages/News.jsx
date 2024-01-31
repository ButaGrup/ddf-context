import React, { useEffect, useState }  from "react";
import MediaItem from "../components/Media/MediaItem";
import '../assets/css/Galery.css';
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { GlobalContext} from "./GlobalState";
import Pagination from "../components/Pagination/Pagination";
import { fetchData } from "../assets/api/dataFetching";



const News = () => {
    // Context api-dəki qlobal state-lər
    const {newsData , lang} = useContext(GlobalContext)
    const [newsImg , setNewsImg] = useState('')

  // State-lər
  const [currentPage , setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)

  // Video Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = newsData.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(newsData.length / recordsPerPage)

    useEffect(() => {
        window.localStorage.setItem('newsData', JSON.stringify(newsData));
    }, [newsData]);

    useEffect(() => {
      
        fetchData(`${lang}/mediaimg`)
        .then((data) => setNewsImg(data.data));
      } , [lang])


    return (
        <>
            <div className='heading-all' style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${newsImg.mediaimg})`}}>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={lang === 'az' ? 'Xəbərlər' : 'News'} />
                </div>
            </div>
            <div className="galery">
                <div className="container galery-container">
                    <div className="row galery-row">
                        <div className="galery-header">
                            <h3>{lang === 'az' ? 'Xəbərlər' : 'News'}</h3>
                        </div>
                    </div>
                    <div className="row">
                        {currentRecords.map((item) => (
                            <MediaItem
                                key={item.id}
                                id={item.id}
                                image={item.img}
                                description={item.description}
                                date={item.date}
                                title={item.title}
                            />
                        ))}
                    </div>
                    <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage }  />
                </div>
            </div>
            <div className="section-footer-bg pd-b">
                <div className="container custom-container">
                    <Footer />
                </div>
            </div>
        </>
    );
}

export default News;
