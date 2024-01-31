import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "react-image-gallery/styles/css/image-gallery.css";

const MediaPhotoItems = ({ vector, vector2, id, dataFancybox, image, images, description, date }) => {
  // State-lər
  const [isMobile, setIsMobile] = useState(false);

  let allImgs = [];

  allImgs.push(image, ...images);  
  

  // Ekran genişliyinə görə foto qalereya itemlərinin görüntüsü 
  useEffect(() => {
      if (window.innerWidth <= 968) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }

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
        onClick={() => window.scrollTo(0, 0)}
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="col-lg-4 col-md-6 media-item-column"
      >
        <div class="thumbnail thumbnail-product-grid-view">
        {vector || vector2 ? (
          allImgs.map((item) => (
            <a href="https://" className="media-item gallery-card" data-aos="zoom-in" data-aos-duration="700"
              data-fancybox={dataFancybox}
              data-src={item}
              data-caption={description}
              >
              <div className="media-image">
                <img src={item} alt="" />
                <p className="media-image-text">{created_at}</p>
              </div>
              <p dangerouslySetInnerHTML={{ __html: description }} />
            </a>
          ))
        ) : (
          <Link to={`/media/news/${id}`} className="news-item-link">
            <div
              className="media-item"
            >
              <div className="media-image">
                <img
                  src={image}
                  alt="media item"
                />
                {(vector || vector2) && (
                  <div className="media-galery-icon">
                    <img
                      className="img-fluid"
                      src={vector}
                      alt="media item"
                    />
                  </div>
                )}
                <div className="media-image-text">{created_at}</div>
              </div>
              <div dangerouslySetInnerHTML={{ __html: description }}></div>
            </div>
          </Link>
        )}
      </div>
      </div>
    </>
  );
};

export default MediaPhotoItems;
