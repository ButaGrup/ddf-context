import React, { useContext, useEffect, useState } from "react";
import "../assets/css/Müraciet.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { GlobalContext } from "./GlobalState";
import axios from "axios";
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import { applySchema } from '../schema/applySchema';
import { fetchData } from "../assets/api/dataFetching";

const Muraciet = () => {
  // Forumdan-data çəkmək üçün lazım olacaq
  let handleSubmitForm = async (e) => {
    if(cvName) {
      axios.post(`https://api.ddf.az/api/${lang}/apply-vacancy`, data)
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
    }else{
      setErrorCv(true);
    }

    values.name = "";
    values.phone = "";
    values.email = "";
    values.address = "";
    values.message = "";
    values.type = "";
    values.subject = "";
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      phone: "",
      email: "",
      name: "",
      address: "",
      type: "",
      subject: "",
      message: ""
    },
    validationSchema: applySchema,
    onSubmit: handleSubmitForm
  });

  // State-lər
  const [pdfFile, setPdfFile] = useState();
  const [cvName,setCvName] = useState('');
  const [errorCv,setErrorCv] = useState(false);
  const [applyImg,setApplyImg] = useState('');

  // Context api-dəki qlobal state
  const {lang} = useContext(GlobalContext)

  // Seçilmiş faylın state içərisinə atılması
  const handleFileChange = (e) => {
    if (e.target.files) {
      setPdfFile(e.target.files[0]);
      setCvName(e.target.files[0].name);
      setErrorCv(false);
    }
  };

  useEffect(() => {
    fetchData(`${lang}/karyeraimg`)
    .then((data) => setApplyImg(data.data));
  } , [lang])


  // EndPoint-lər
  let data = new FormData();
  data.append('name',values.name);
  data.append('type',values.type);
  data.append('message',values.message);
  data.append('address',values.address);
  data.append('subject',values.subject);
  data.append('email',values.email);
  data.append('phone',values.phone);
  data.append('fileUpload',pdfFile);


  return (
    <div>
      <div className="heading-all" style={{background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%),URL(${applyImg.karyeraimg})`}}>
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === 'az' ? 'Müraciət' : 'Apply'} />
        </div>
      </div>
      <div className="container apply-container">
        <div className="row apply-row">
          <div className="col-lg-12">
            <form className="apply-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">{lang === 'az' ? 'Ad, Soyad, Ata adı (*):' : 'Name, Surname, Father name (*):'}</label>
                <input
                  type="text"
                  className={errors.name && touched.name ? "form-control input-error" : "form-control"}
                  id="name"
                  name="name"
                  placeholder={lang === 'az' ? "Ad və soyadınızı daxil edin" : "Enter your name and surname"}
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && <p className="error">{errors.name}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="phone">{lang === 'az' ? 'Telefon nömrəniz:' : 'Phone Number:'}</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  className={errors.phone && touched.phone ? "form-control input-error" : "form-control"} 
                  placeholder="+994xxxxxxxxx" 
                  value={values.phone} 
                  onBlur={handleBlur} 
                  onChange={handleChange}  
                />
                {errors.phone && touched.phone && <p className="error">{errors.phone}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="email">{lang === 'az' ? 'Email (*):' : 'Email (*):'}</label>
                <input
                  type="text"
                  className={errors.email && touched.email ? "form-control input-error" : "form-control"}
                  id="email"
                  name="email"
                  placeholder={lang === 'az' ? "Email ünvanınızı daxil edin" : "Enter your email"}
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && <p className="error">{errors.email}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="address">{lang === 'az' ? 'Ünvan (*):' : 'Address (*)'}</label>
                <input
                  type="text"
                  className={errors.address && touched.address ? "form-control input-error" : "form-control"}
                  id="address"
                  name="address"
                  placeholder={lang === 'az' ? "Ünvanınızı daxil edin" : "Enter your address"}
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && <p className="error">{errors.address}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="type">{lang === 'az' ? 'Müraciətin növü (*):' : 'Type of Application (*):'}</label>
                <input
                  type="text"
                  className={errors.type && touched.type ? "form-control input-error" : "form-control"}
                  id="type"
                  name="type"
                  placeholder="-"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.type && touched.type && <p className="error">{errors.type}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="subject">{lang === 'az' ? 'Müraciətin mövzusu (*):' : 'Subject (*)'}</label>
                <input
                  type="text"
                  className={errors.subject && touched.subject ? "form-control input-error" : "form-control"}
                  id="subject"
                  name="subject"
                  placeholder="-"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.subject && touched.subject && <p className="error">{errors.subject}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="message">{lang === 'az' ? 'Mesajınız (*):' : 'Your message (*)'}</label>
                <textarea
                  type="text"
                  rows={5}
                  className={errors.message && touched.message ? "form-control input-error" : "form-control"}
                  id="message"
                  name="message"
                  placeholder={lang === 'az' ? "Mesajınızı daxil edin" : "Enter your message"}
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.message && touched.message && <p className="error">{errors.message}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="file-upload" className="file-upload-label">
                  {cvName ? cvName : (lang === 'az' ? 'CV Yüklə' : 'Upload CV')}
                  <svg
                    className="file-upload"
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
                <input onChange={handleFileChange} accept="application/pdf" id="file-upload" type="file" />
                {errorCv && <p className="error">{lang === 'az' ? 'Xaiş edirik CV-nizi daxil edin!' : 'Please enter your CV!'}</p>}
              </div>
              <div
                style={{ marginTop: "22px" }}
                className="d-flex justify-content-center align-center"
              >
                <button type="submit" className="btn form-send">
                  {lang === 'az' ? 'Göndər' : 'Send'}
                </button>
              </div>
            </form>
          </div>
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

export default Muraciet;
