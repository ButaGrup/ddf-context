import React, { useContext } from "react";
import group45 from "../../img/group45.svg";
import vector2 from "../../img/Vector2.svg";
import { Link } from "react-router-dom";
import MediaVideoGaleryİtem from "./MediaVideoGaleryİtem";
import { GlobalContext } from "../../pages/GlobalState";

const MediaGaleryVideo = () => {
  // Context API-dəki qlobal state-lər
  const { setGaleryText, videoGalleryItems, lang } = useContext(GlobalContext);

  // Foto Qalereya səhifəsindəki qalereya itemlərin limitli şəkildə göstərilməsi
  const n = 6;
  const videoGallery = videoGalleryItems.slice(0, n);
   
  // Qalereya itemlərinə kliklənən zaman uyğun item-in innerText-nin Context Api-ə göndərilməsi
  const handleClick = () => {
    window.scrollTo(0,0);
    setGaleryText('Video Qalereya');
  };

  return (
    <>
      <div className="media-header">
        <h3>{lang === 'az' ? 'Video Qalereya' : 'Video Gallery'}</h3>
        <Link onClick={handleClick} to="/media/gallery/videos" className="media-header-more">
          <img src={group45} alt="group45" />
          {lang === 'az' ? 'Daha çox' : 'More'}
        </Link>
      </div>
      {videoGallery.map((item) => (
        <MediaVideoGaleryİtem
          key={item.id}
          id={item.id}
          image={item.img}
          vector2={vector2}
          date={item.date}
          description={item.title}
          url={item.url}
        />
      ))}
      
    </>
  );
};

export default MediaGaleryVideo;