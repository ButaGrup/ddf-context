import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import vector3 from "../img/vacancy/vector3.svg";
import "../assets/css/VacancyDetail.css";
import company from "../img/VacancyDetail/company.svg";
import VacancyItems from "../components/Vacancy/VacancyItems";
import { useState } from "react";
import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import { useParams } from "react-router-dom";
import axios from "axios";
import Swal from 'sweetalert2';
import { useEffect } from "react";
import { fetchData } from "../assets/api/dataFetching";
import { useFormik } from "formik";
import { contactSchema } from "../schema/contactSchema";


const VacancyDetail = () => {
  // Context api-dəki qlobal state-lər
  const { vacancyData , lang } = useContext(GlobalContext);
  // Uyğun vakansiyanın İD-si 
  const {vacancyId} = useParams();

  // State-lər
  const [isSend, setIsSend] = useState(false);
  // const [surname,setSurname] = useState('');
  const [cv,setCv] = useState();
  const [cvName,setCvName] = useState('');
  const [errorCv,setErrorCv] = useState(false);
  const [vacDetail,setVacDetail] = useState('');

    // Müraciətin göndərilməsi
    const handleSubmitForm = async (e) => {
      e.preventDefault();
      if(cvName) {
        axios.post(`http://api-ddf.asdfghjkl.gov.az/api/${lang}/apply-vacancyid`, data)
        .then(function (response) {
          Swal.fire(
            `${lang === 'az' ? 'Mesajınız Göndərildi': 'Your Message Has Been Sent'}`,
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
        // setSurname('');
        setCv('');
      }else{
        setErrorCv(true);
      } 
    };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      name: "",
      message: ""
    },
    validationSchema: contactSchema,
    onSubmit: handleSubmitForm
  });

  // Endpointlər
  let data = new FormData();
  data.append('id',vacancyId);
  data.append('name',values.name);
  // data.append('surname',surname);
  data.append('message',values.message);
  data.append('fileUpload',cv);


  let vacancyAnnounceData = [];

  for (const key in vacancyData) {
    if (vacancyData[key].archive === 0) {
      vacancyAnnounceData.push({ ...vacancyData[key] });
    }
  }

  // Vakansiya Detal səhifəsindəki digər vakansiyaların limitli şəkildə göstərilməsi
  const n = 6;
  const vacancyDetailOtherItems = vacancyAnnounceData.slice(-n);  

  // Ümumi vakansiyalar içində seçilmiş vakansiyanın İD-sinə görə tapılması
  const vacancyDetailData = vacancyData.find((item) => item.id === Number(vacancyId));

  const vacancyDetailOthers = vacancyDetailOtherItems.filter((item) => item.id !== Number(vacancyId));




  // Seçilmiş faylın state içərisinə atılması
  const handleFileChange = (e) => {
    if (e.target.files) {
      setCv(e.target.files[0]);
      setCvName(e.target.files[0].name);
      setErrorCv(false);
    }
  };

  useEffect(() => {
    fetchData(`${lang}/karyeraimg`)
    .then((data) => setVacDetail(data.data));
  } , [lang])
    

  return (
    <div>
      <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${vacDetail.karyeraimg})`}}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Vakansiyalar' : 'Vacancies'} />
        </div>
      </div>
      <div className="vacancy-detail">
        <div className="empty-vacancy-detail"></div>
        <div className="container vacancy-detail-container">
          <div className="row vacancy-detail-row">
            <div
              className="col-md-7 col-sm-12 mb-3"
              data-aos="zoom-in"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1000"
            >
              <div className="vacancy-detail-informations">
                <h2 className="vacancy-detail-title">{vacancyDetailData.name}</h2>

                <h6 className="vacancy-detail-work-information">
                  {lang === 'az' ? 'İş barədə məlumat' : 'Information about job'}
                </h6>
                <div 
                  className="vacancy-detail-description"
                  dangerouslySetInnerHTML={{ __html: vacancyDetailData.description }}
                >
                </div>
              </div>
            </div>
            <div
              className="col-md-5 col-sm-12 mb-3"
              data-aos="zoom-in"
              data-aos-anchor-placement="top-bottom"
              data-aos-duration="1000"
            >
              <div className="vacancy-detail-appeal">
                <div
                  style={{ borderBottom: "1px solid #E6E6E6" }}
                  className="d-flex justify-content-center"
                >
                  <img
                    className="img-fluid"
                    style={{ marginBottom: "10px" }}
                    src={company}
                    alt="company"
                  />
                </div>
                <div className="row mb-3">
                  <div className="col-7 pe-0 mt-3 mb-3" style={{ fontWeight: "700" }}>
                    {lang === 'az' ? 'Yerləşdirilmə tarixi' : 'Posting date'}
                  </div>
                  <div
                    className="col-5 pe-0  mt-3"
                    style={{ color: "rgba(48, 60, 66, 1)" }}
                  >
                    {vacancyDetailData.start_date}
                  </div>
                  <div className="col-7 pe-0" style={{ fontWeight: "700" }}>
                    {lang === 'az' ? 'Bitmə tarixi' : 'Deadline'}
                  </div>
                  <div
                    className="col-5 pe-0"
                    style={{ color: "rgba(48, 60, 66, 1)" }}
                  >
                    {vacancyDetailData.end_date}
                  </div>
                </div>
                <div className="vacancy-detail-appeal-button">
                  {!isSend ? (
                    <button onClick={() => setIsSend(true)}>{lang === 'az' ? 'MÜRACİƏT ET' : 'Apply'} </button>
                  ) : (
                    <form onSubmit={handleSubmit} className="vacancy-detail-form">
                      <div className="row">
                        <div className="col-12">
                          <input
                            type="text"
                            placeholder={lang === 'az' ? 'Ad və soyadınızı daxil edin!' : 'Enter your name and surname!'}
                            style={{ width: "100%" }}
                            className={errors.name && touched.name ? "form-control input-error" : "form-control"}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            id="name"
                            name="name"
                          />
                          {errors.name && touched.name && (
                            <p className="error">{errors.name}</p>
                          )}
                        </div>
                        {/* <div className="col-6">
                          <input
                            type="text"
                            placeholder={lang === 'az' ? 'Soyad' : 'Surname'}
                            style={{ width: "100%" }}
                            required
                            value={surname}
                            onChange={(e) => setSurname(e.target.value)}
                          />
                        </div> */}
                        <div className="col-12">
                          <textarea
                            rows="6"
                            placeholder={lang === 'az' ? 'Məlumat' : 'İnformation'}
                            className={errors.message && touched.message ? "form-control input-error" : "form-control"}
                            value={values.message}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            style={{ width: "100%" }}  
                            id="message"
                            name="message"                          
                          ></textarea>
                          {errors.message && touched.message && <p className="error">{errors.message}</p>}
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="file-upload" className="custom-file-upload">
                          {cvName ? cvName : (lang === 'az' ? 'CV Yüklə' : 'Upload CV')}{" "}
                          <svg
                            className="vacancy-detail-file-upload"
                            viewBox="0 0 15 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M9.375 11.2749H11.6016C13.2129 11.2749 14.5312 10.4191 14.5312 8.82568C14.5312 7.23223 12.9785 6.43887 11.7188 6.37646C11.4583 3.88447 9.63867 2.36865 7.5 2.36865C5.47852 2.36865 4.17656 3.71016 3.75 5.04053C1.99219 5.20752 0.46875 6.32607 0.46875 8.15772C0.46875 9.98936 2.05078 11.2749 3.98438 11.2749H5.625"
                              stroke="black"
                              strokeWidth="0.9375"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M9.375 7.99365L7.5 6.11865L5.625 7.99365"
                              stroke="black"
                              strokeWidth="0.9375"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M7.5 13.631V6.5874"
                              stroke="black"
                              strokeWidth="0.9375"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </label>
                        <input id="file-upload" type="file" accept="application/pdf" onChange={handleFileChange}/>
                        {errorCv && <p className="error">{lang === 'az' ? 'Xaiş edirik CV-nizi daxil edin!' : 'Please enter your CV!'}</p>}
                      </div>
                      <button style={{ marginTop: '10px' }}>{lang === 'az' ? 'GÖNDƏR' : 'SEND'}</button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="row vacancy-detail-row1">
            <p style={{ fontSize: '32px', fontWeight: '600' }} className='mb-4'>{lang === 'az' ? 'Digər vakansiya' : 'Other vacancy'}</p>
            {vacancyDetailOthers.map((vacancyItem) => (
              <div className="col-lg-4 col-md-6 mb-3" key={vacancyItem.id}>
                <VacancyItems
                  id={vacancyItem.id}
                  title={vacancyItem.name}
                  description={vacancyItem.description}
                  startDate={vacancyItem.start_date}
                  endDate={vacancyItem.end_date}
                  sections={vacancyItem.sections}
                  work_qraf={vacancyItem.work_qraf}
                  salary={vacancyItem.salary}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="vacancy-detail-img">
          <img src={vector3} className="img-fluid" alt="vector3" />
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default VacancyDetail;
