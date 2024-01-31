import React from "react";
import vector2 from '../img/Vector2.svg';
import '../assets/css/Galery.css';
import MediaVideoGaleryİtem from "../components/Media/MediaVideoGaleryİtem";
import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const VideoGalery = () => {
  // Context api-dəki qlobal state
  const {videoGalleryItems} = useContext(GlobalContext)

  // State-lər
  const [currentPage , setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)

  // Video Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = videoGalleryItems.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(videoGalleryItems.length / recordsPerPage)

  return (
    <>
          <div className="row galery-row w-100">
            {currentRecords.map((item) => (
              <MediaVideoGaleryİtem
                key={item.id}
                image={item.img}
                vector2={vector2}
                description={item.title}
                date={item.date}
                url={item.url}
              />
            ))}
            <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage }  />
          </div>
          
    </>
  );
};

export default VideoGalery;
