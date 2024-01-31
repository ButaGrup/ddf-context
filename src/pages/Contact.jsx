import React, { useEffect, useState } from "react";
import "../assets/css/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import fb from "../img/fb.svg";
import tel from "../img/tel.png";
import insta from "../img/insta.svg";
import linkedin from "../img/in.svg";
import axios from "axios";
import { useContext } from "react";
import { GlobalContext } from "./GlobalState";
import { fetchData } from "../assets/api/dataFetching";
import Swal from "sweetalert2";
import { useFormik } from "formik";
import { contactSchema } from "../schema/contactSchema";
import email from "../img/email.png";
import LoadingOverlay from 'react-loading-overlay';

const Contact = () => {
  const [isLoading,setIsLoading] = useState(false);

  console.log(isLoading);

  // Post request atılması üçün istifadə edilən funksiya
  let handleSubmitForm = async (e) => {
    const data = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      address: values.address,
      message: values.message,
    };

    setIsLoading(true);
   
    await axios
      .post(`https://api.ddf.az/api/${lang}/contact`, JSON.stringify(data))
      .then(function (response) {
        Swal.fire(
          `${
            lang === "az"
              ? "Mesajınız Göndərildi"
              : "Your Message Has Been Sent"
          }`,
          "",
          "success"
        );
      })
      .catch(function (error) {
        Swal.fire({
          icon: "error",
          title: `${lang === "az" ? "Xəta Baş Verdi" : "An Error Occurred"}`,
          text: "",
        });
      });

      values.name = "";
      values.phone = "";
      values.email = "";
      values.address = "";
      values.message = "";

      setIsLoading(false);
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        phone: "",
        email: "",
        name: "",
        address: "",
        message: "",
      },
      validationSchema: contactSchema,
      onSubmit: handleSubmitForm,
    });

  // POST request zamanı dataları göndərmək üçün inputlardan yığılan məlumatların saxlanıldığı state-lər
  const { lang } = useContext(GlobalContext);
  const [contactData, setContactData] = useState([
    {
      address: "",
      email: "",
      phone: [],
    },
    {
      address: "",
      email: "",
      phone: [],
    },
  ]);
  const [socialData, setSocialData] = useState([]);
  const [contactImg, setContactImg] = useState("");
  const [corrupt, setCorrupt] = useState([]);

  // Yığılan dataların vahid bir obyektə yığılması
  // let data = new FormData();
  // data.append("name", values.name);
  // data.append("type", values.type);
  // data.append("message", values.message);
  // data.append("address", values.address);
  // data.append("subject", values.subject);
  // data.append("email", values.email);
  // data.append("phone", values.phone);

  useEffect(() => {
    fetchData(`${lang}/address`).then((data) => setContactData(data.data));
    fetchData("az/socicalMedia").then((data) => setSocialData(data.data[0]));
  }, [lang]);

  useEffect(() => {
    fetchData(`${lang}/contactimg`).then((data) => setContactImg(data.data));
  }, [lang]);

  useEffect(() => {
    fetchData(`${lang}/info`).then((data) => setCorrupt(data.data[0].info));
  }, [lang]);

  return (
    <div>
      <div
        className="heading-all"
        style={{
          background: `linear-gradient(180deg,
            rgba(0, 0, 0, 0.7) 0%,
            rgba(0, 0, 0, 0) 49.48%,
            rgba(0, 0, 0, 0.7) 100%), URL(${contactImg.contactimg})`,
        }}
      >
        <div className="container heading-all-container header-bg-respon">
          <Navbar title={lang === "az" ? "Əlaqə" : "Contact"} />
        </div>
      </div>
      <div className="container contact-container">
        <div className="row contact-row">
          <div
            className="col-lg-4"
            data-aos="zoom-in-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            <div className="contact-left-information">
              <div>
                <h1 className="contact-h1">
                  {lang === "az"
                    ? "Əlaqə məlumatları:"
                    : "Contact information:"}
                </h1>
                <p
                  className="contact-details"
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                  }}
                >
                  <b>{lang === "az" ? "Ünvanlar:" : "Addresses:"} </b>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "8px",
                    }}
                  >
                    <span>{contactData[0].address}</span>
                    <span>{contactData[1].address}</span>
                  </div>
                </p>
                <p className="contact-details">
                  <img
                    style={{ marginRight: "8px", width: "20px" }}
                    src={email}
                    alt="email"
                  />{" "}
                  <span>{contactData[0].email}</span>
                </p>
                <div
                  style={{
                    marginBottom: "10px",
                  }}
                >
                  <img
                    src={tel}
                    alt=""
                    style={{ marginRight: "10px", width: "18px" }}
                    className="contact-img"
                  />
                  <span className="contact-details">
                    {contactData[0].phone}
                  </span>
                </div>
                {/* <h1 className="contact-h1">{lang === 'az' ? 'Əlaqə nömrələri:' : 'Contact numbers:'}</h1> */}
                {/* {item.phone.map((i, index) => (
                    <div
                      key={index}
                      style={{
                        marginBottom: "10px",
                      }}
                    >
                      <img src={tel} alt="" style={{ marginRight: '10px', width: '18px' }} className="contact-img" />
                      <span className="contact-details">{i}</span>
                    </div>
                  ))} */}
              </div>

              <div className="social-link">
                <ul>
                  <li>
                    <a target={"_blank"} rel="noreferrer" href={socialData.fb}>
                      <img alt="icon" src={fb} />
                    </a>
                  </li>
                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href={socialData.instagram}
                    >
                      <img alt="icon" src={insta} />
                    </a>
                  </li>
                  <li>
                    <a
                      target={"_blank"}
                      rel="noreferrer"
                      href={socialData.linkedin}
                    >
                      <img alt="icon" src={linkedin} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="corrupt">
              <p className="cor-p1" dangerouslySetInnerHTML={{__html: corrupt}} />
                {/* {lang === 'az' ? `"Daşkəsən Dəmir Filiz" MMC-nin fəaliyyətinə dair
                korrupsiya xarakterli şahid olduğunuz hər hansı hallar ilə bağlı
                aşağıda qeyd olunan elektron poçt vasitəsilə operativ qaydada
                məlumat verə bilərsiniz.` : 

                `You can promptly report any cases of corruption that you 
                have witnessed regarding the activities of "Dashkasan Demir Filiz" 
                LLC through the e-mail mentioned below.`}
              </p>
              <a href="mailto:anti-corruption@ddf.az">anti-corruption@ddf.az</a>
              <p>
                {lang === 'az' ? `Bütün müraciətlərin konfidensiallığı qorunacaqdır.
                Xatırladaq ki, korrupsiyaya qarşı mübarizə hər bir vətəndaşın
                vəzifəsidir!` : 

                `All applications will be kept confidential. Let us remind you 
                that the fight against corruption is the duty of every citizen!`} */}
       

            </div>
          </div>
          <div
            className="col-lg-7"
            data-aos="zoom-in-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">
                  {lang === "az"
                    ? "Ad, Soyad, Ata adı (*):"
                    : "Name, Surname, Father name (*):"}
                </label>
                <input
                  type="text"
                  className={
                    errors.name && touched.name
                      ? "form-control input-error"
                      : "form-control"
                  }
                  id="name"
                  name="name"
                  placeholder={
                    lang === "az"
                      ? "Ad və soyadınızı daxil edin"
                      : "Enter your name and surname"
                  }
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.name && touched.name && (
                  <p className="error">{errors.name}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone">
                  {lang === "az" ? "Telefon nömrəniz:" : "Phone Number:"}
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={
                    errors.phone && touched.phone
                      ? "form-control input-error"
                      : "form-control"
                  }
                  placeholder="+994xxxxxxxxx"
                  value={values.phone}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                {errors.phone && touched.phone && (
                  <p className="error">{errors.phone}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  {lang === "az" ? "Email (*):" : "Email (*):"}
                </label>
                <input
                  type="text"
                  className={
                    errors.email && touched.email
                      ? "form-control input-error"
                      : "form-control"
                  }
                  id="email"
                  name="email"
                  placeholder={
                    lang === "az"
                      ? "Email ünvanınızı daxil edin"
                      : "Enter your email"
                  }
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <p className="error">{errors.email}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="address">
                  {lang === "az" ? "Ünvan (*):" : "Address (*):"}
                </label>
                <input
                  type="text"
                  className={
                    errors.address && touched.address
                      ? "form-control input-error"
                      : "form-control"
                  }
                  id="address"
                  name="address"
                  placeholder={
                    lang === "az"
                      ? "Ünvanınızı daxil edin"
                      : "Enter your address"
                  }
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.address && touched.address && (
                  <p className="error">{errors.address}</p>
                )}
              </div>
              {/* <div className="form-group">
                <label htmlFor="type">
                  {lang === "az"
                    ? "Müraciətin növü (*):"
                    : "Type of Application:"}
                </label>
                <input
                  type="text"
                  className={
                    errors.type && touched.type
                      ? "form-control input-error"
                      : "form-control"
                  }
                  id="type"
                  name="type"
                  placeholder="-"
                  value={values.type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.type && touched.type && (
                  <p className="error">{errors.type}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="subject">
                  {lang === "az" ? "Müraciətin mövzusu (*):" : "Subject:"}
                </label>
                <input
                  type="text"
                  className={
                    errors.subject && touched.subject
                      ? "form-control input-error"
                      : "form-control"
                  }
                  id="subject"
                  name="subject"
                  placeholder="-"
                  value={values.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.subject && touched.subject && (
                  <p className="error">{errors.subject}</p>
                )}
              </div> */}
              <div className="form-group">
                <label htmlFor="message">
                  {lang === "az" ? "Mesajınız (*):" : "Your message (*):"}
                </label>
                <textarea
                  type="text"
                  rows={5}
                  className={
                    errors.message && touched.message
                      ? "form-control input-error"
                      : "form-control"
                  }
                  id="message"
                  name="message"
                  placeholder={
                    lang === "az"
                      ? "Mesajınızı daxil edin"
                      : "Enter your message"
                  }
                  value={values.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></textarea>
                {errors.message && touched.message && (
                  <p className="error">{errors.message}</p>
                )}
              </div>
              <div
                style={{ marginTop: "22px" }}
                className="d-flex justify-content-center align-center"
              >
                <button type="submit" className="btn contact-send">
                  {lang === "az" ? "Göndər" : "Send"}
                </button>
              </div>
            </form>
          </div>
          <div
            className="col-lg-12 contact-map"
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
            data-aos-duration="1000"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12132.206644420661!2d46.06636042165081!3d40.51834920492261!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x403f666d7287bc41%3A0xb58ad3e666d71486!2sDashkasan%2C%20Azerbaijan!5e0!3m2!1sen!2s!4v1670399687931!5m2!1sen!2s"
              style={{ border: "0", width: "100%", height: "470px" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="example iFrame Equalize Digital Home Page"
            ></iframe>
          </div>
        </div>
      </div>
      <div className="section-footer-bg pd-b">
        <div className="container custom-container">
          <Footer />
        </div>
      </div>

      {isLoading && <LoadingOverlay
        active={true}
        spinner
        text={lang === "az" ? "Məlumatlar göndərilir..." : "İnformation is sending!!!"}
        >
      </LoadingOverlay>}

    </div>     
  );
};

export default Contact;
