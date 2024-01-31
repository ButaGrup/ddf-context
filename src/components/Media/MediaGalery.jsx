import React, { useContext } from "react";
import group45 from "../../img/group45.svg";
import vector from "../../img/Vector.svg";
import vector2 from "../../img/Vector2.svg";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../pages/GlobalState";
import MediaPhotoItems from "./MediaPhotoItems";

const MediaGalery = () => {
  // Context API-dəki qlobal state-lər
  const { setGaleryText , photoGaleryItem, lang } = useContext(GlobalContext);

  // Foto Qalereya səhifəsindəki qalereya itemlərin limitli şəkildə göstərilməsi
  const n = 6;
  const photoGallery = photoGaleryItem.slice(0, n)

  // Qalereya itemlərinə kliklənən zaman uyğun item-in innerText-nin Context Api-ə göndərilməsi
  const handleClick = () => {
    window.scrollTo(0,0);
    setGaleryText('Foto Qalereya');
  };

  return (
    <>
      <div className="media-header">
        <h3>{lang === 'az' ? 'Foto Qalereya' : 'Photo Gallery'}</h3>
        <Link onClick={handleClick} to="/media/gallery/photos" className="media-header-more">
          <img src={group45} alt="group45" />
          {lang === 'az' ? 'Daha çox' : 'More'}
        </Link>
      </div>
      {photoGallery.map((item,i) => {
        return (
            <MediaPhotoItems
              key={item.id}
              id={item.id}
              images={item.imgs}
              image={item.img}
              vector={vector}
              description={item.title}
              vector2={vector2}
              date={item.date}
              dataFancybox={`gallery-${i+1}`}
            />
          )
      })}
    </>
  );
};

export default MediaGalery;
