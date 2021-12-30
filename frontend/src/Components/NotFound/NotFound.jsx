import React from "react";
import "./NotFound.css";
import {useNavigate} from 'react-router-dom'
import Helmet from 'react-helmet'
import starmartlogo from './starmart.png'

const NotFound = ({history}) => {

    const navigate = useNavigate();

    const homePage = () => {
        navigate('/');
    }


  return (
    <>
    <Helmet>
            <title>Page Not Found</title>
    </Helmet>
    <div className='notfound-container'>
      <img src={starmartlogo} alt="logo" className="notfound-image" onClick={homePage} />
      <div className='notfound-body'>
        <h3>Looking for something?</h3>
        <h5>
          We're sorry. The Web address you entered is not a functioning page on
          our site.
        </h5>
        <h5>Click On The Icon Below To Go To Star Mart's Home Page</h5>
        <img src="https://img.icons8.com/flat-round/64/000000/home--v1.png" className="notfound-home" onClick={homePage}/>
      </div>
    </div>
    </>
  );
};

export default NotFound;
