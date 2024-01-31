import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../assets/css/Yataqlar.css";
import Footer from "../components/Footer";
import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useState } from "react";

const Project = () => {
  // Context api-dəki qlobal state-lər
  const { projectData, lang } =
    useContext(GlobalContext);
    const [mineImg , setMineImg] = useState('')

  // Yataqlar description
  const description = projectData.desciriptions;

  // Yataqlardan birinə kliklənən zaman uyğun itemin indexsini contex APİ-ə göndərir
  // const handleDetailClick = (index) => {
  //   setProjectDetailIndex(index);
  //   window.localStorage.setItem("indexOfProject", index);
  // };

  useEffect(() => {
    fetchData(`${lang}/projectimg`)
    .then((data) => setMineImg(data.data));
  },[lang])





  return (
    <>
      <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${mineImg.projectimg})`}}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === "az" ? "Fəaliyyət" : "Activity"} />
        </div>
      </div>
      <div className="projects">
        <div className="container projects-container py-5">
          <div className="row">
            <div className="col-12">
              <nav>
                <ul className="project-detail-heading-link">
                  <Link to={"/"}>
                    {lang === "az" ? "Ana Səhifə" : "Main Page"}
                  </Link>
                  <span style={{ marginLeft: "10px", marginRight: "10px" }}>
                    &#8725;
                  </span>
                  <li>{lang === "az" ? "Fəaliyyət" : "Activity"}</li>
                </ul>
              </nav>
            </div>
            <div className="col-12">
              <p
                className="projects-description"
                dangerouslySetInnerHTML={{
                  __html: projectData.main_title.title,
                }}
              ></p>
            </div>
            {/* <div className="col-md-6 d-flex align-item-center justify-content-center my-2">
              <Link to={`/yataqlar/${projectData.desciriptions[1].id}`} className="project-item">
                <div className="project-image">
                  <img src={projectData.desciriptions[0].img} alt="image1" />
                </div>
                <div style={{ height: '47%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span dangerouslySetInnerHTML={{__html : projectData.desciriptions[0].title}} className="project-text"></span>
                </div>
              </Link>
            </div> */}
            {/* {description.map((item,index) => (
              <div className="col-md-6 d-flex align-item-center justify-content-center my-2">
                <Link to={`/mines/${item.id}`} className="project-item" onClick={handleDetailClick.bind(null,index)}>
                  <div className="project-image">
                    <img src={item.img} alt="image2" />
                  </div>
                  <div style={{ height: '47%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span  className="project-text"></span>
                  </div>
                </Link>
              </div>
            ))} */}
            {/* <div style={{overflowX: 'auto'}}>
              <table className="table">
                <tr style={{ color: "#fff" }}>
                  <th>№</th>
                  <th>Yatağın adı</th>
                  <th>Məlumat</th>
                </tr>
                {description.map((item, index) => (
                  <tr>
                    <td>{index+1}</td>
                    <td style={{ paddingLeft: "15px" }} dangerouslySetInnerHTML={{__html : item.title}}></td>
                    <td dangerouslySetInnerHTML={{__html : item.description}}> 
                    </td>
                  </tr>
                ))}
              </table>
            </div> */}

            <div className="container pro-cont">

            {
              description.length > 0 ?               <div className="t-head row">
                <div className="p-no col-md-1">№</div>
                <div className="pr-name col-md-4">{lang === 'az' ? 'Yatağın adı' : 'The name of the mine'}</div>
                <div className="pr-desc col-md-7">{lang === 'az' ? 'Məlumat' : 'Information'}</div>
              </div> : null 
            }

              {
                description.map((item,index) => (
                  <div className="t-body row">
                    <div className="p-dno col-md-1">{index+1}</div>
                    <div className="pr-dname col-md-4" dangerouslySetInnerHTML={{__html: item.title}}></div>
                    <div className="pr-ddesc col-md-7" dangerouslySetInnerHTML={{__html: item.description}}></div>
                 </div>
                ))
              }
            </div>
          </div>
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Project;
