import React, { useState } from "react";
import "../../assets/css/Media.css";
import "react-image-gallery/styles/css/image-gallery.css";
import '../../../node_modules/react-modal-video/scss/modal-video.scss';
import ModalVideo from "react-modal-video";
import getVideoId from 'get-video-id';

const MediaVideoGaleryİtem = ({ image, vector2, description, date, url }) => {
  // State
  const [isGaleryModal, setIsGaleryModal] = useState(false);

  // Seçilmiş video-nun İD-si
  const { id } = getVideoId(url);

  // Modal-in video item-ə kliklən zaman açılması
  const handleClick = () => {
    setIsGaleryModal(true);
  };

  let created_at = date.slice(0,10);

  return (
    <>
      <div
        className="col-lg-4 col-md-6 media-item-column"
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
      >
        <div className="media-item" onClick={vector2 && handleClick}>
          <div className="media-image">
            <img src={image} alt="video item"/>
            {vector2 && (
              <div className="media-galery-icon">
                <img className="img-fluid" src={vector2} alt="video item" />
              </div>
            )}
            <div className="media-image-text">{created_at}</div>
          </div>
          <p dangerouslySetInnerHTML={{ __html : description }}>
            
          </p>
        </div>
      </div>
      {isGaleryModal && (
        <div className="fancybox">
          <ModalVideo channel='youtube' autoplay isOpen={isGaleryModal} videoId={id} onClose={() => setIsGaleryModal(false)} />
        </div>
      )}
    </>
  );
};

export default MediaVideoGaleryİtem;
