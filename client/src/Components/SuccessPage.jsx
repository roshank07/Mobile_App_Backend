import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HeaderHome from "../page/HeaderHome";
import '../styles/SuccessPage.css'; // Import your CSS file
import { Button } from 'react-bootstrap';

const SuccessPage = () => {
  const navigate=useNavigate();
  const { orderId, paymentId } = useParams();
  const handleClick=()=>{
    console.log("In here2");
    navigate(`/`);
  }

  return (
    <div>
      <HeaderHome />
      <div className="success-page-container">
        <h1 className="success-title">Payment Successful!</h1>
        <p className="order-payment-info">Order ID: {orderId}</p>
        <p className="order-payment-info">Payment ID: {paymentId}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
      <Button as="input" type="submit" value="Homepage" onClick={handleClick} />
      </div>
    </div>
  );
};

export default SuccessPage;
