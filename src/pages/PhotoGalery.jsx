import React from "react";
import vector from '../img/Vector.svg';
import "../assets/css/Galery.css";
import MediaPhotoItems from "../components/Media/MediaPhotoItems";
import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import { useState } from "react";
import Pagination from "../components/Pagination/Pagination";

const Galery = () => {
  // Context api-dəki qlobal state
  const {photoGaleryItem} = useContext(GlobalContext);



  // Satate
  const [currentPage , setCurrentPage] = useState(1)
  const [recordsPerPage] = useState(9)

  // Foto Qalereya məlumatlarının pagination-la hissələrə ayrılması
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = photoGaleryItem.slice(indexOfFirstRecord,indexOfLastRecord);
  const nPages = Math.ceil(photoGaleryItem.length / recordsPerPage)


  // const newDate =   currentRecords.map(obj => {
  //   return{...obj , date: new Date(obj.date)}
  // })


  // const sortedAsc = newDate.sort(
  //   (objA, objB) => Number(objA.date) - Number(objB.date),
  // );




  return (
    <>
      <div className="row galery-row w-100">
        {currentRecords.map((item,i) => {
          return (
            <MediaPhotoItems
              currentRecords={currentRecords}
              key={item.id}
              id={item.id}
              description={item.title}
              images={item.imgs}
              image={item.img}
              vector={vector}
              date={item.date}
              dataFancybox={`gallery-${i+1}`}
            />
          )
        })}
        <Pagination nPages = { nPages } currentPage = { currentPage } setCurrentPage = { setCurrentPage } />
      </div>
    </>
  );
};

export default Galery;
