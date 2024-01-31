import { Link } from 'react-router-dom'
import { useContext, useEffect} from "react";
import "./style.css"
import fb from "../../img/fb.svg";
import insta from "../../img/insta.svg";
import linkedin from "../../img/in.svg"
import btn from "../../img/subscribebtn.svg"
import { GlobalContext } from "../../pages/GlobalState";
import {fetchData} from '../../assets/api/dataFetching'
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';
// import {postDatas} from '../../assets/api/dataPost'
// import axios from 'axios';

function Footer() {
    const { setContextData , setGaleryText, data , setData , lang  } = useContext(GlobalContext);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    const clickEvent = (e) => {
        window.scrollTo(0, 0);
        setContextData(e.target.innerText);
        window.localStorage.setItem('aboutText', e.target.innerText);
    }
    const [email, setEmail] = useState("");
    const [unvan, setUnvan] = useState({
        address: '',
        email: '',
        phone: '',
        address2: ''
    });
    let postData = new FormData();
    postData.append('email',email);
  
  
    // Formdan-data çəkmək üçün lazım olacaq
    let handleSubmit = async (e) => {
      e.preventDefault();
      axios.post(`https://api.ddf.az/api/${lang}/email`, postData)
      .then(function (response) {
        Swal.fire(
            `${lang === 'az' ? 'Abunə Olundu': 'Subscribed'}`,
            '',
            'success'
          )
      })
      .catch(function (error) {
        Swal.fire({
            icon: 'error',
            title:`${lang === 'az' ? 'Xəta Baş Verdi': 'An Error Occurred'}`,
            text: ''
          })
      });
    };


    const handleClick = () => {
        window.scrollTo(0, 0);
        setGaleryText('Foto Qalereya');
    };


      useEffect(() =>{
        fetchData('az/socicalMedia').then(data => setData(data.data[0]))
      },[setData])

      useEffect(() =>{
        fetchData(`${lang}/address`).then(data => setUnvan({
            address: data.data[0].address,
            email: data.data[0].email,
            phone: data.data[0].phone[0],
            address2: data.data[1].address
        }))
      },[lang])
      
    return (
        <>
            <div className="home-news-row hr mr-b footer-direction">
                <div className='col-md-8'>
                    <ul className="footer-list footer-wrap">
                        <li>
                            <span>{lang === 'az' ? 'HAQQIMIZDA' : 'ABOUT US'}</span>
                            <ul>
                                <Link to="/about/history" onClick={clickEvent}><li>{lang === 'az' ? '"Daşkəsən Dəmir Filiz" MMC' : '"Dashkasan Iron Ore" LLC'}</li></Link>
                                {/* <Link to="/about/values-vision" onClick={clickEvent}><li>{lang === 'az' ? 'Dəyər və Hədəflərimiz' : 'Values and Vision'}</li></Link> */}
                                {/* <Link to="/about/management" onClick={clickEvent}><li>{lang === 'az' ? 'Rəhbərlik' : 'Management'}</li></Link> */}
                                <Link to="/about/supervisory" onClick={clickEvent}><li>{lang === 'az' ? 'Müşahidə Şurası' : 'Supervisory Board'}</li></Link>
                                <Link to="/about/structure" onClick={clickEvent}><li>{lang === 'az' ? 'Struktur' : 'Structure'}</li></Link>
                                <Link to="/about/legislation" onClick={clickEvent}><li>{lang === 'az' ? 'Qanunvericilik' : 'Legislation'}</li></Link>
                                <Link to="/about/reception-days" onClick={clickEvent}><li>{lang === 'az' ? 'Qəbul günləri' : 'Reception days'}</li></Link>
                            </ul>
                        </li>
                        <li style={{ width: '122px' }}>
                            <span>{lang === 'az' ? 'SATINALMA' : 'PROCUREMENT'}</span>
                            <ul>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/purchase/purchase-announce"><li>{lang === 'az' ? 'Satınalma elanları' : 'Procurement announcements'}</li></Link>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/purchase/purchase-archive"><li>{lang === 'az' ? 'Satınalma arxivi' : 'Procurement archive'}</li></Link>
                            </ul>
                        </li>
                        <li>
                            <span>{lang === 'az' ? 'FƏALİYYƏT' : 'ACTIVITY'}</span>
                            <ul>
                                {/* <Link onClick={() => window.scrollTo(0, 0)} to="/mines"><li>{lang === 'az' ? 'Yataqlar' : 'Mines'}</li></Link> */}
                                {/* <Link onClick={() => window.scrollTo(0,0)} to="#"><li>KSM</li></Link> */}
                            </ul>
                        </li>
                        <li>
                            <span>{lang === 'az' ? 'MEDİA' : 'MEDIA'}</span>
                            <ul>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/media/news"><li>{lang === 'az' ? 'Xəbərlər' : 'News'}</li></Link>
                                <Link onClick={handleClick} to="/media/gallery/photos"><li>{lang === 'az' ? 'Qalereya' : 'Gallery'}</li></Link>
                            </ul>
                        </li>
                        <li>
                            <span>{lang === 'az' ? 'KARYERA' : 'CAREER'}</span>
                            <ul>
                                {/* <Link to="#"><li>Kadr siyasəti</li></Link> */}
                                <Link onClick={() => window.scrollTo(0, 0)} to="/vacancies"><li>{lang === 'az' ? 'Vakansiyalar' : 'Vacancies'}</li></Link>
                                <Link onClick={() => window.scrollTo(0, 0)} to="/apply"><li>{lang === 'az' ? 'Müraciət' : 'Apply'}</li></Link>
                            </ul>
                        </li>
                        <li>
                            <span>{lang === 'az' ? 'ƏLAQƏ' : 'CONTACT'}</span>
                            <ul>    
                                <Link to="#"><li>{unvan.phone}</li></Link>
                                <Link to="#"><li>{unvan.email}</li></Link>
                                <Link to="#"><li>{unvan.address}</li></Link>
                                <Link to="#"><li>{unvan.address2}</li></Link>
                            </ul>
                        </li>
                    </ul>
                </div>
                <div className='col-md-4'>
                    <div className="footer-contact">
                        <div className="suscribe-section">
                            <h3>{lang === 'az' ? 'Bildirişləri əldə et' : 'Get notifications'}</h3>
                            <div className="suscribe">
                                <form onSubmit={handleSubmit} method="POST" >
                                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="sub_email" id="sub_email" placeholder={lang === 'az' ? "E-mail ünvanınızı daxil edin" : "Enter your email adress"} required />
                                    <button type='submit'>
                                        <img src={btn} alt="subscribe Btn" />
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="footer-social-media">
                            <h3>{lang === 'az' ? 'Bizi izləməyi unutma' : "Don't forget to follow us"}</h3>
                            <ul className="social-icons">
                                <a target={'_blank'} rel="noreferrer" href={data.fb}><li><img src={fb} alt="Facebook icon" /></li></a>
                                <a target={'_blank'} rel="noreferrer" href={data.instagram}><li><img src={insta} alt="Instagram Icon" /></li></a>
                                <a target={'_blank'} rel="noreferrer" href={data.linkedin}><li><img src={linkedin} alt="Linkedin icon" /></li></a>
                                {/* <a href='#' style={{ pointerEvents: 'none' }} ><li><img src={yt} alt="Youtube Icon" /></li></a> */}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="home-news-row justify-content-start footer-wrap">
                <div className='copyright-item'>{lang === 'az' ? 'copyright@Daşkəsən Dəmir Filizi' : 'copyright@Dashkasan Iron Ore'}</div>
                <div className='copyright-item'>{lang === 'az' ? 'Bütün hüquqlar qorunur' : 'All rights reserved'}</div>
                <a href='https://www.butagrup.com.tr/' rel="noreferrer" target='_blank' className='copyright-item'>{lang === 'az' ? 'Buta Grup tərəfindən hazırlanmışdır' : 'Site by Buta Grup'}</a>
            </div>
        </>
    );
}

export default Footer;
