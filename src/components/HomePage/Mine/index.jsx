import "./style.css";
import { Link } from "react-router-dom";
import {  useContext} from "react";
import { GlobalContext } from "../../../pages/GlobalState";


function Mine() {
  const {projectData,setProjectDetailIndex , lang} = useContext(GlobalContext)

  const description = projectData.desciriptions;

  const handleClick = (index) => {
    window.scroll(0,0);
    window.localStorage.setItem('indexOfProject', index);
    setProjectDetailIndex(index);
  };

  return (
    <>
      <div className="projects">
        <div className="container projects-container py-5">
          <div className="row">
            <div className="col-12">
              <h3 className="projects-home-title">{lang === 'az' ? 'Yataqlar' : 'Mines'}</h3>
            </div>
            <div className="col-12">
              <p className="projects-description" dangerouslySetInnerHTML={{ __html: projectData.main_title.title }}>
              </p>
            </div> 
            {description.map((item,index) => (
              <div key={item.id} className="col-md-6 d-flex align-item-center justify-content-center my-2">
                <Link onClick={handleClick.bind(null, index)} to={`/mines/${item.id}`} className="project-item">
                  <div className="project-image">
                    <img src={item.img} alt="image2" />
                  </div>
                  <div
                    style={{
                      height: "47%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="project-text" dangerouslySetInnerHTML={{ __html: item.title }}>
                      
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Mine;
