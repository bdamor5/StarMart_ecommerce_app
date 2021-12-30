import React from 'react'
import './Loader.css'
import star from './star.png'

const Loader = () => {
    return (
        <>
            <div className="starloader">
                <img src={star} alt="loading..." />
            </div>
        </>
    )
}

export default Loader
