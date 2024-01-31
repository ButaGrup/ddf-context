import { Link } from 'react-router-dom';
import group45 from '../../../img/group45.svg';
import "./style.css";
import { useContext, useEffect, useState } from 'react';
import { fetchData } from '../../../assets/api/dataFetching';
import { GlobalContext } from '../../../pages/GlobalState';

function HomeNews() {
    const [news , setNews] = useState([]);
    const {lang} = useContext(GlobalContext)

    useEffect(() => {
        fetchData(`${lang}/news/lastThree`)
        .then(data => setNews(data.data))
    },[lang]);

    return (
        <>
            <div className="home-news-row">
                <h2 data-aos="zoom-in" data-aos-duration="1000">{lang === 'az' ? 'Son Xəbərlər' : 'Last News'}</h2>
                <Link to='/media/news/'>
                    <button
                        data-aos="zoom-in"
                        data-aos-duration="1000"
                        onClick={() => window.scrollTo(0,0)}
                    >
                        <img src={group45} alt="group45" />
                        {lang === 'az' ? 'Daha çox' : 'More'}
                    </button>
                </Link>
            </div>
            <div className="news-section-boxs row">
                {news.map((item) => 
                        <div
                            className='col-lg-4 col-md-6 d-flex justify-content-center'
                            data-aos="fade-up"
                            data-aos-duration="1000"
                            key={item.id}
                            >
                            <Link className='home-page-news-link' onClick={() => window.scrollTo(0,0)} to={`/media/news/${item.id}`}>
                                <div className="home-page-news-box px-custom-0">
                                    <div className="box-img">
                                        <img className='img-three img-fluid' src={item.img} alt="" />
                                        <button>{item.date}</button>
                                    </div>
                                        <p className="news-box-content" dangerouslySetInnerHTML={{ __html: item.title }}>
                                        </p>
                                </div>
                            </Link>
                        </div>
                    )}
            </div>
        </>
    );
}

export default HomeNews;
