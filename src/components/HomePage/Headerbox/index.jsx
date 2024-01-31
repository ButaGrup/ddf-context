
import "./style.css";
import { GlobalContext } from "../../../pages/GlobalState";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { fetchData } from "../../../assets/api/dataFetching";

function Headerbox() {
  const { lang } = useContext(GlobalContext);
  const [latestNews, setLatestNews] = useState({
    id: "",
    title: "",
    description: "",
  });



  // const [width, setWidth] = useState(window.innerWidth);
  // const updateDimensions = () => {
  //   setWidth(window.innerWidth)
  // };

  // let result = latestNews.description

  // if(width <= 768){
  //   const trimmed = latestNews.description;
  //   result = trimmed.slice(0, 150);
  // }
  // else if(width <= 425){
  //   const trimmed = latestNews.description;
  //   result = trimmed.slice(0, 10);
  // }

  useEffect(() => {
    fetchData(`${lang}/mainpage`).then((data) =>
      setLatestNews({
        id: data.data.id,
        title: data.data.mainlink,
        description: data.data.content,
      })
    );

    // window.addEventListener("resize", updateDimensions);
    // return () => window.removeEventListener("resize", updateDimensions);

  }, [lang]);



  return (
    <>
      <div className="nav-box" data-aos="fade-down" data-aos-duration="1000">
        <div
          className="header-box-description"
          dangerouslySetInnerHTML={{ __html: latestNews.description }}
        ></div>
        {/* <p>{}</p> */}
        <button>
          <a href={latestNews.title} rel="noreferrer" target="_blank">
            {lang === "az" ? "ƏTRAFLI" : "MORE"}
          </a>
        </button>
      </div>
    </>
  );
}

export default Headerbox;
