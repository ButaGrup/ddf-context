import { useEffect } from "react";
import { createContext, useState } from "react";
import { fetchData } from "../assets/api/dataFetching";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const getDetailIndex = () => {
      let detailIndex = window.localStorage.getItem('indexOfProject');
      if(detailIndex){
        return detailIndex
      }else{
        return ''
      }
    };

    const getAboutText = () => {
      let aboutText = window.localStorage.getItem('aboutText');
      if(aboutText){
        return aboutText
      }else{
        return ''
      }
    };

    const getVacancyData = () => {
      let vacancyData = window.localStorage.getItem('vacancyData');
      if(vacancyData){
        return JSON.parse(vacancyData)
      }else{
        return []
      }
    };

    const getNewsData = () => {
      let newsData = window.localStorage.getItem('newsData');
      if(newsData){
        return JSON.parse(newsData)
      }else{
        return []
      }
    };

    const getRehberlikData = () => {
      let rehberlikData = window.localStorage.getItem('rehberlikData');
      if(rehberlikData){
        return JSON.parse(rehberlikData)
      }else{
        return []
      }
    };

    const getPurchData = () => {
      let purchData = window.localStorage.getItem('purchaseData');
      if(purchData){
        return JSON.parse(purchData)
      }else {
        return {}
      }
    };

    const getPurchDetailTitle = () => {
      let purchData = window.localStorage.getItem('purchTitle');
      if(purchData){
        return purchData;
      }else {
        return '';
      }
    };

    const getPurchDetailDescription = () => {
      let purchData = window.localStorage.getItem('purchDescription');
      if(purchData){
        return purchData;
      }else {
        return '';
      }
    };

    const getGaleryText = () => {
      let galeryText = window.localStorage.getItem('galeryText');
      if(galeryText){
        return galeryText;
      }else {
        return '';
      }
    };

    const getSearchText = () => {
      let searchText = window.localStorage.getItem('searchText');
      if(searchText){
        return searchText;
      }else {
        return '';
      }
    };

    const getPurchDetailStartDate = () => {
      let startDate = window.localStorage.getItem('purchStartDate');
      if(startDate){
        return startDate;
      }else {
        return '';
      }
    };

    const getPurchDetailEndDate = () => {
      let endDate = window.localStorage.getItem('purchEndDate');
      if(endDate){
        return endDate;
      }else {
        return '';
      }
    };


    const getBackground = () => {
      let bckgroundImg = window.localStorage.getItem('bckgroundImg');
      if(bckgroundImg){
        return bckgroundImg;
      }else {
        return '';
      }
    };

    // Qlobal State-lər
    const [contextData , setContextData] = useState(getAboutText());
    const [galeryText,setGaleryText] = useState(getGaleryText());
    const [purchaseTitle,setPurchaseTitle] = useState(getPurchDetailTitle());
    const [purchaseDesc,setPurchaseDesc] = useState(getPurchDetailDescription());
    const [purchaseStartDate,setPurchaseStartDate] = useState(getPurchDetailStartDate());
    const [purchaseEndDate,setPurchaseEndDate] = useState(getPurchDetailEndDate());
    const [data, setData] = useState([]);
    const [videoGalleryItems,setVideoGalleryItems] = useState([]);
    const [photoGaleryItem,setPhotoGaleryItem] = useState([]);
    const [newsData,setNewsData] = useState(getNewsData());
    const [rehberlikData , setRehberlikData] = useState(getRehberlikData());
    const [searchData , setSearchData] = useState(getSearchText());
    const [lang , setLang] = useState('az');
    const [vacancyData,setVacancyData] = useState(getVacancyData());
    const [projectDetailIndex,setProjectDetailIndex] = useState(getDetailIndex());
    const [purchaseData , setPurchaseData] = useState(getPurchData())
    const [purchaseHistoryData , setPurchaseHistoryData] = useState([])
    const [background , setBackground] = useState(getBackground())
    const [purchaseAnnounceData , setPurchaseAnnounceData] = useState([])
    const [ projectData , setProjectData ] = useState({
      main_title: {
        title: ''
    },
    desciriptions: [
        {
            id: '',
            title: '',
            content: '',
            img: ''
        },
        {
            id: '',
            title: '',
            content: '',
            img: ''
        },
        {
          id: '',
          title: '',
          content: '',
          img: ''
      },
    ]
  });

    // Get Requestlər (Global Dataların əldə olunması)
    useEffect(() => {
      fetchData(`${lang}/videoGallery`)
      .then((data) => setVideoGalleryItems(data.data));

      fetchData(`${lang}/gallery`)
      .then((data) => setPhotoGaleryItem(data.data));

      fetchData(`${lang}/news`)
      .then((data) => setNewsData(data.data));

      fetchData(`${lang}/projects`)
      .then((data) => setProjectData(data.data));

      fetchData(`${lang}/vacancies`)
      .then((data) => setVacancyData(data.data));
      
      fetchData(`${lang}/purchase`)
      .then((data) => setPurchaseData(data.data));

      fetchData(`${lang}/management`)
      .then((data) => setRehberlikData(data.data));

      fetchData(`${lang}/mainImg`)
      .then((data) => setBackground(data.data));

    } , [lang])

    // Global State-lərin diger səhifələrdə işlədilməsi üçün export edilir
    const value = {
        contextData,
        setContextData,
        galeryText,
        setGaleryText,
        purchaseTitle,
        setPurchaseTitle,
        data,
        setData,
        videoGalleryItems,
        setVideoGalleryItems,
        photoGaleryItem,
        setPhotoGaleryItem,
        newsData,
        projectData,
        setProjectData,
        setLang,
        lang,
        projectDetailIndex,
        setProjectDetailIndex,
        vacancyData,
        setVacancyData,
        purchaseDesc,
        setPurchaseDesc,
        purchaseData,
        setPurchaseData,
        purchaseAnnounceData,
        setPurchaseAnnounceData,
        purchaseHistoryData,
        setPurchaseHistoryData,
        rehberlikData,
        setRehberlikData,
        searchData,
        setSearchData,
        purchaseStartDate,
        purchaseEndDate,
        setPurchaseStartDate,
        setPurchaseEndDate,
        background,
        setBackground
    };
  
    return (
      <GlobalContext.Provider value={value}>{children}</GlobalContext.Provider>
    );
};