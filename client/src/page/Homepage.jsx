import React,{useState,useEffect} from "react";
import Login from "../Components/Login";
import Register from "../Components/Register";
import {useNavigate} from "react-router-dom";


// import cookie from "js-cookie";

const Homepage=()=>{
    const[step,setStep]=useState("LOGIN");
    const[response,setResponse]=useState(undefined);
    const navigate=useNavigate();
    useEffect(() => {
      const cookie=document.cookie.split("=");
      //console.log(cookie);
      async function getAuthData(){
      try{
        if(cookie.length>1){
          const data=await fetch(`/api/user/auth/check`,
          {
            method: 'GET', //default
            headers: {
              authorization:cookie[1],

            },
          })
          const response=await data.json();
          
          if(response.message==="Cookie verification failed"){
          navigate(`/`);
          setResponse("");
          }
          else{
          setResponse(response);
          navigate(`profile/${response.id}`);
          }
        }
        else {
          navigate(`/`);
          setResponse("");
        }
      
      }catch(error){  // see how api failure error will be handled
      navigate(`/`);
      setResponse("");
    }
    }
    getAuthData();
      
    }, []);

    if(response===undefined){
      return (
        <>
        <h1 style={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh"}}>
          Loading...</h1>
        </>
      )
    }
  
    return (
        <>
          {step === "LOGIN" ? (
            <Login handleChange={(state) => setStep(state)} />
          ) : 
          (
            <Register handleChange={(state) => setStep(state)} />
          )}
        </>
      );


}

export default Homepage;