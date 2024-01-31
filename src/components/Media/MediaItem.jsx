import React, { useEffect } from "react";
import { useState } from "react";
import "../../assets/css/Media.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";



const MediaItem = ({ vector, vector2, id, image, title, date }) => {
  // State
  const [isMobile, setIsMobile] = useState(false);

  // Ekran genişliyinə görə media itemlərinin görüntüsü 
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 968) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, [isMobile]);

  let created_at = date.slice(0,10);
  


  return (
    <>
      <div
       onClick={() => window.scrollTo(0,0)}
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="col-lg-4 col-md-6 media-item-column"
      >
        {vector || vector2 ? (
          <div
            className="media-item"
          >
            <div className="media-image">
              <img src={image} alt="media item"/>
              {(vector || vector2) && (
                <div className="media-galery-icon">
                  <img
                    className="img-fluid"
                    src={(vector && vector) || (vector2 && vector2)}
                    alt="media gallery"
                  />
                </div>
              )}
              <div className="media-image-text">{created_at}</div>
            </div>
            <div  dangerouslySetInnerHTML={{__html: title}}></div>
          </div>
        ) : (
          <Link to={`/media/news/${id}`} className='news-item-link'>
            <div
              className="media-item"
              // onClick={(vector || vector) && handleClick}
            >
              <div className="media-image">
              <img src={image} alt="media item"/>
                {(vector || vector2) && (
                  <div className="media-galery-icon">
                    <img
                      className="img-fluid"
                      src={(vector && vector) || (vector2 && vector2)}
                      alt="media item"
                    />
                  </div>
                )}
                <div className="media-image-text">{created_at}</div>
              </div>
              <div  dangerouslySetInnerHTML={{__html: title}}></div>
            </div>
          </Link>
        )}
      </div>
      {/* {isGaleryModal && (
        <div className="fancybox">
          <div className="image-gallery-close" onClick={handleClose}>
            <img src={close} alt="close" />
          </div>
          <ImageGallery
            items={images}
            thumbnailPosition={!isMobile ? "left" : "bottom"}
            showFullscreenButton={false}
            useBrowserFullscreen={false}
            showPlayButton={false}
          />
        </div>
      )} */}
    </>
  );
};

export default MediaItem;