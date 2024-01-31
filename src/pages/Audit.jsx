import React from 'react'
import { useState } from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import audit from '../../src/img/tax.svg'
import { fetchData } from '../assets/api/dataFetching'
import '../assets/css/Audit.css'
import { GlobalContext } from './GlobalState'

const Audit = () => {
  const { lang } = useContext(GlobalContext);
  const [auditData,setAuditData] = useState([]);

  useEffect(() => {
    fetchData(`${lang}/audit`)
    .then((data) => setAuditData(data.data));
  },[lang])

  return (
    <div className='audit-container col-md-8'>
      {auditData.map((item) => (
        <div className="audit-inner" key={item.id}>
          <div className="audit-icon">
            <img src={audit} alt="" />
          </div>
          {item.pdfUrl && <div className="audit-text">
            <h3>{item.title}</h3>
            {item.pdfUrl === null ? '' : <a href={item.pdfUrl} download >{lang === 'az' ? 'Yüklə' : 'Download'}</a>}
          </div>}
          {item.url && <a href={item.url} target='_blank' rel='noreferrer' style={{ color: '#212529' }} className="audit-text-url">
            <h3>{item.title}</h3>
            {item.pdfUrl === null ? '' : <a href={item.pdfUrl} download >{lang === 'az' ? 'Yüklə' : 'Download'}</a>}
          </a>}
        </div>
      ))}
      
    </div>
  )
}

export default Audit