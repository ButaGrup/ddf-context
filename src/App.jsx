import { Route, Routes } from "react-router-dom";
import Career from "./pages/Career";
import Contact from "./pages/Contact";
import Galery from "./pages/Galery";
import Home from "./pages/Home";
import NewsDetail from "./pages/NewsDetail";
import Project from "./pages/Project";
import Vacancy from "./pages/Vacancy";
import Manage from "./pages/Manage";
import Media from "./pages/Media";
import ProjectDetail from "./pages/ProjectDetail";
import Tariximiz from "./pages/Tariximiz";
import Rehberlik from "./pages/Rehberlik";
import Mission from "./pages/Mission";
import Struktur from "./pages/Struktur";
import Qanunvericilik from "./pages/Qanunvericilik";
import Muraciet from './pages/Muraicet'
import VideoGalery from "./pages/VideoGalery";
import News from "./pages/News";
import NotFound from "./pages/404";
import VacancyDetail from "./pages/VacancyDetail";
import PhotoGalery from './pages/PhotoGalery';
import Purchase from "./pages/Purchase";
import PurchaseDetail from "./pages/PurchaseDetail";
import Müşahidə from "./pages/Müşahidə";
import PurchaseAnnounce from "./pages/PurchaseAnnounce";
import PurchaseHistory from "./pages/PurchaseHistory";
import RehberlikDetail from "./pages/RehberlikDetail";
import VacancyArchive from "./pages/VacancyArchive";
import Search from "./pages/Search";
import Audit from "./pages/Audit";
import loadingGif from './img/gif-ddf.gif'
import { useState,useEffect } from "react";
import ReceptionDays from "./pages/ReceptionDays";
import StrukturDetail from "./pages/StrukturDetail";

function App() {
  // const [isAccess,setIsAccess] = useState(false);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsAccess(true);
  //   },3000);
  // }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  },[])

  return (
    <>
      {/* {isAccess && <AccessibilityWidget className='accessibility-ddf' />} */}
      {loading ? (
        <div className="loader-overlayy">
        <img src={loadingGif} alt="" />
      </div>
      ) : (
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about/" element={<Manage />}>
          <Route path="history" element={<Tariximiz />} />
          <Route exact path="management" element={<Rehberlik />} />
          {/* <Route path="values-vision" element={<Mission />} /> */}
          <Route path="structure" element={<Struktur />} />
          <Route path="legislation" element={<Qanunvericilik />} />
          <Route path="reception-days" element={<ReceptionDays />} />
          <Route path="supervisory" element={<Müşahidə />} />
          <Route path="audit" element={<Audit />} />
        </Route>
        <Route path="/activity" element={<Project />} />
        <Route path="/about/management/:rehberlikId" element={<RehberlikDetail />} />
        <Route path="/about/structure/:structureId" element={<StrukturDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apply" element={<Muraciet />} />
        <Route path="/activity/:projectId" element={<ProjectDetail />} />
        <Route path="/career" element={<Career />} />
        <Route path="/vacancies" element={<Vacancy />} />
        <Route path="/vacancies/vacancy-history" element={<VacancyArchive />} />
        <Route path="/vacancies/:vacancyId" element={<VacancyDetail />} />
        <Route path="/media" element={<Media />} />
        <Route path="/media/news" element={<News />} />
        <Route path="/purchase" exact element={<Purchase />} />
        <Route path="/purchase/purchase-announce" element={<PurchaseAnnounce />} />
        <Route path="/purchase/purchase-archive" element={<PurchaseHistory />} />
        <Route path="/purchase/:purchaseId" element={<PurchaseDetail />} />
        <Route path="/media/gallery/" element={<Galery />} >
          <Route path="photos" element={<PhotoGalery />} />
          <Route path="videos" element={<VideoGalery />} />
        </Route>
        <Route path="/media/news/:newsId" element={<NewsDetail />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      )}
      
    </>
  );
}

export default App;