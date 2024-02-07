import React from 'react';
import  { useNavigate } from 'react-router-dom';
import '../styles/signout_page.css';
import background_login from "../images/dog_signout.jpg";
const Signout = () => {
  const navigate=useNavigate();

  const deleteCookie =()=> {
    // Specify the name of the session cookie you want to delete
    var CookieName = "authToken";
    
    // Delete the session cookie
    document.cookie = `${CookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure`;
    document.cookie = `${CookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/profile; SameSite=None; Secure`;

    // Redirect to the home page or any other page after sign-out
     navigate(`/`);
  }
  return (
    <div className="container-signout" style={{ backgroundImage: `url(${background_login})` }}>
      <div className="signout-box">
        <h2>Signout</h2>
        <p>Do you confirm?</p>
        <button className="confirm-button" onClick={deleteCookie}>Confirm</button>
      </div>
    </div>
  );
};

export default Signout;
