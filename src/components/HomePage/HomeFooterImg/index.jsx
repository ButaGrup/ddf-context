import React, {useEffect, useState } from "react";
import Slider from "react-slick";
import "./style.css"
import { fetchData } from "../../../assets/api/dataFetching";
import { GlobalContext } from "../../../pages/GlobalState";
import { useContext } from "react";


const HomeFooterImg = () => {
    const [slideData , setSlideData] = useState([])
    const {lang} = useContext(GlobalContext);

    useEffect(() =>{
        fetchData(`${lang}/slider`)
        .then((data) => setSlideData(data.data));
    },[lang])




    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        autoplay: true,
        slidesToShow: slideData.length > 4 ? 4 : slideData.length-1,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
      };
    return (
        <div className="footer-img-parent">
            <Slider className="home-slick-wrapper" {...settings}>



                {slideData.map((slide) =>
                    <a href={slide.url} target='_blank' rel="noreferrer" key={slide.id} className="footer-img-child">
                        <img src={slide.img} alt="Heydar Əliyev" />
                    </a>
                )}

            </Slider>
        </div>
    );
}

export default HomeFooterImg