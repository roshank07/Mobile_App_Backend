import React from 'react';
import HeaderHome from "../page/HeaderHome";
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../styles/FailedPage.css'; // Import your CSS file

const FailedPage = () => {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate(`/`);
  }
  return (
    <div>
      <HeaderHome />
      <div className="failed-page-container">
        <h1 className="failed-title">Payment Failed</h1>
        <p className="failed-message">
          We're sorry, but your payment could not be processed successfully.
        </p>
        <Button as="input" type="submit" value="Homepage" onClick={handleClick} />
      </div>
    </div>
  );
};

export default FailedPage;
