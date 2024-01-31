import React from "react";
import MediaItem from "./MediaItem";
import group45 from "../../img/group45.svg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../pages/GlobalState";

const MediaNews = () => {  
  // Context API-dəki qlobal state-lər
  const {newsData , lang} = useContext(GlobalContext)

  // Foto Qalereya səhifəsindəki qalereya itemlərin limitli şəkildə göstərilməsi
  const n = 6;
  const newsDatas = newsData.slice(0, n)


  return (
    <>
      <div className="media-header">
        <h3>{lang === 'az' ? 'Xəbərlər' : 'News'}</h3>
        <Link onClick={() => window.scrollTo(0,0)} to='/media/news'>
          <div className="media-header-more">
            <img src={group45} alt="group45" />
            {lang === 'az' ? 'Daha çox' : 'More'}
          </div>
        </Link>
      </div>
      {newsDatas.map((item) => (
        <MediaItem title={item.title} key={item.id} id={item.id} image={item.img} date={item.date} />
      ))}
    </>
  );
};

export default MediaNews;