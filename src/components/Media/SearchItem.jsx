import React, { useEffect } from "react";
import { useState } from "react";
import "../../assets/css/Media.css";
import "react-image-gallery/styles/css/image-gallery.css";
import { Link } from "react-router-dom";



const SearchItem = ({ vector, vector2, id, image, title, date }) => {
  // State
  const [isMobile, setIsMobile] = useState(false);

  // Ekran genişliyinə responsivliyin təmin edilməsi
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth <= 968) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    });
  }, [isMobile]);


  return (
    <>
      <div
       onClick={() => window.scrollTo(0,0)}
        data-aos="zoom-in"
        data-aos-anchor-placement="top-bottom"
        data-aos-duration="500"
        className="col-12 search-item-column"
      >
        <Link className="search-link"  to={`/media/news/${id}`}  dangerouslySetInnerHTML={{__html: title}}></Link>
      </div>
    </>
  );
};

export default SearchItem;