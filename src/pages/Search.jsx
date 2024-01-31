import React, { useEffect }  from "react";
import SearchItem from "../components/Media/SearchItem";
import '../assets/css/Galery.css';
import Footer from "../components/Footer"
import Navbar from "../components/Navbar";
import { useContext } from "react";
import { GlobalContext} from "./GlobalState";
import { fetchData } from "../assets/api/dataFetching";
import { useState } from "react";


const Search = () => {
    // Context api-dəki qlobal state-lər
    const {newsData , lang , searchData} = useContext(GlobalContext)
    const [searchImg , setSearchImg] = useState('')

    // Axtarış zamanı filterlənmiş məlumatların əldə edilməsi 
    let filteredNews = newsData.filter(item => item.title.toLowerCase().trim().includes(searchData))
    const netice = filteredNews.length

    useEffect(() => {
        window.localStorage.setItem('newsData', JSON.stringify(newsData));
    }, [newsData]);

    useEffect(() => {
        fetchData(`${lang}/mediaimg`)
        .then((data) => setSearchImg(data.data));
      },[lang])

    return (
        <>
            <div className='heading-all' style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${searchImg.mediaimg})`}}>
                <div className="container heading-all-container header-bg-respon">
                    <Navbar title={lang === 'az' ? 'Axtarış' : 'Search'} />
                </div>
            </div>
            <div className="galery">
                <div className="container galery-container">
                    <div className="row galery-row">
                        <div className="galery-header">
                            <h3>{filteredNews.length === 0 ? '' : `'${searchData}' sözü üzrə ${netice} nəticə tapılıb`}</h3>
                        </div>
                    </div>
                    <div className="row">
                        {filteredNews.length === 0 ? <p style={{marginTop: '15px' , fontSize: '20px'}}>Nəticə Tapılmadı...</p> : filteredNews.map((item) => (
                            <>
                                <SearchItem
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                />
                            </>
                        ))}
                    </div>
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

export default Search;
