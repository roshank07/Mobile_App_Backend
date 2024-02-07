import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ProfilePage.css"; // Import your CSS file
import Button from 'react-bootstrap/Button';
import HeaderHome from "./HeaderHome";

const ProfilePage = () => {
  const [data, setData] = useState(undefined);
  const navigate=useNavigate();
  // const [amount1, setAmount] = useState(undefined);
  // setAmount(2);

  useEffect(() => {
    const getProduct = async () => {
      const responseData = await fetch('https://dummyjson.com/products');
      const response = await responseData.json();
    //   console.log(response);
      setData(response);
    };

    getProduct();
  }, []);

  useEffect(()=>{
    const script=document.createElement("script");
    script.src='https://checkout.razorpay.com/v1/checkout.js';
    document.body.appendChild(script);
  },[]);

  const invokePayment = async (price, id) => {
    try {
      // Send the price to the backend
      const response = await fetch(`/api/createOrder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, productId: id }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to create order on the backend');
      }
  
      const data = await response.json();
      // console.log(data); // Log the response from the backend
  
      // Open Razorpay checkout
      var options = {
        "key": "rzp_test_lQBsPlmWSA10lQ", // Enter the Key ID generated from the Dashboard
        "amount":data.amount,    // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency":data.currency,
        "name": "Tech Amigos", //your business name
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": data.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        "handler":async function (response){
          const body={...response,};
          try{
          const validataeResponse=await fetch(`/api/verifyOrder`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
          });

          const validData=await validataeResponse.json();
          if (validData.msg==="success") {
            // Redirect to a new page with order ID and payment ID
            navigate(`/success/${data.id}/${validData.paymentId}`);
          } else {
            // Handle unsuccessful payment validation
            navigate(`/failed`);
            // console.error('Payment validation failed:', validData);
          }
          // console.log(validData);
        }catch(error){
          navigate(`/failed`)
        }
           
        },
        "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
            "name": "Gaurav Kumar", //your customer's name
            "email": "gaurav.kumar@example.com", 
            "contact": "9000090000"  //Provide the customer's phone number for better conversion rates 
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
  
      var transaction = new window.Razorpay(options);
      transaction.open();
    } catch (error) {
      navigate(`/failed`);
      console.error('Error in invoking payment:', error);
    }
  };
  

  return (
    <div>
    <HeaderHome/>
    <div className="profile-page">
      {data
        ? data.products.map((item, index) => (
            <div key={index} className="post-container">
              <img
                className="post-image"
                src={item.thumbnail}
                alt="Couldn't load"
              />
              <div className="post-details">
                <div className="title">{item.title}</div>
                <div className="price">Rs {item.price}</div>
                <Button as="input" type="submit" value="Buy Now"
                onClick={()=>
                    invokePayment(item.price*100,item.id)}  />
              </div>
            </div>
          ))
        : ""}
    </div>
    </div>
  );
};

export default ProfilePage;
