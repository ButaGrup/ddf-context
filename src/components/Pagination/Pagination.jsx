import React from 'react'
import rightArrow from '../../img/right-arrow.png'
import leftArrow from '../../img/left-arrow.png'
import './Pagination.css'

const Pagination = ({nPages ,currentPage ,setCurrentPage }) => {
    
    const pageNumbers = [...Array(nPages + 1).keys()].slice(1)

    const nextPage = () => {
    if(currentPage !== nPages) 
        setCurrentPage(currentPage + 1)
    }

    const prevPage = () => {
        if(currentPage !== 1) 
            setCurrentPage(currentPage - 1)
    }
  return (
    <nav className='mt-4'>
        <ul className="pagination justify-content-center gap-2">
            <li className="page-item" onClick={() => window.scrollTo(0,0)}>
                <img style={{cursor: 'pointer'}}  src={leftArrow} onClick={prevPage} className="page-link" alt='' />
            </li>
            {
                pageNumbers.map(pgNumber =>
                    <li key={pgNumber} className={`page-item ${currentPage === pgNumber ? 'active' : ''}`} onClick={() => window.scrollTo(0,0)}>
                        <span style={{cursor: 'pointer'}} onClick={() => setCurrentPage(pgNumber)} href="#" rel="noreferrer" className='page-link'>
                            {pgNumber}
                        </span>
                    </li>
                )
            }
            <li className="page-item" onClick={() => window.scrollTo(0,0)}>
                <img style={{cursor: 'pointer'}} src={rightArrow} onClick={nextPage}  className="page-link" alt='' />
            </li>
        </ul>
    </nav>
  )
}

export default Pagination
