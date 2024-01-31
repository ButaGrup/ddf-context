import React from 'react'
import Navbar from '../../components/Navbar'
import "./style.css"

const NotFound = () => {
    return (
        <div className="App not-app">
            <div className="container custom-container header-bg-respon">
                <Navbar />
            </div>
            <div className='not-page-flex' >
                <div className='not-found'>
                    <div className='err-status'>404</div>
                    <span className='err-desc'>Not Found</span>
                </div>
            </div>
        </div>
    )
}

export default NotFound
