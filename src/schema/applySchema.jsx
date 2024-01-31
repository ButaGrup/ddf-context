// import { useContext } from 'react';
import * as yup from 'yup';
// import { GlobalContext } from '../pages/GlobalState';

const regexPhone = /[+]994(40|5[015]|60|7[07])\d{7}/;

const language = window.localStorage.getItem('lang');

export const applySchema = yup.object().shape({
    email: yup.string().email(language === 'az' ? 'Xaiş edirik düzgün nömrə daxil edin!' : 'Please enter a valid email!').required(language === 'az' ? "Email tələb olunur!" : "Email required!"),
    phone: yup.string().matches(regexPhone, language === 'az' ? 'Xaiş edirik düzgün nömrə daxil edin!' : 'Please enter a valid phone number').required(language === 'az' ? "Telefon nömrəsi tələb olunur!" : "Phone number required"),
    name: yup.string().required(language === 'az' ? "Ad və soyadınızı daxil edin!" : "Please enter your name and surname!"),
    address: yup.string().required(language === 'az' ? "Ünvanınızı daxil edin!" : "Please enter your address!"),
    type: yup.string().required(language === 'az' ? "Müraciətin növü tələb olunur!" : "Type of application required!"),
    subject: yup.string().required(language === 'az' ? "Müraciətin mövzusu tələb olunur!" : "Subject of application required!"),
    message: yup.string().required(language === 'az' ? "Mesajınızı daxil edin!" : "Please enter your message!"),
});
