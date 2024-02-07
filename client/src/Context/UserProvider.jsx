import React, { Children, useEffect, useState } from "react";

import {UserContext} from "./UserContext";


const UserProvider=()=>{
    const[response,setResponse]=useState(undefined);
    
    useEffect(()=>{
        const getData=async()=>{
            try{
            console.log("inside userprovider",document.cookie);
            const data=await fetch(`/api/${props}`,{
            headers:{
                authorization: document.cookie.split("=")[1],

            }
            });
            const response=data.json();
            setResponse(response);
        } catch(error){
            console.log(error);
        }
        };
        getData();  

    },[]);

    return(
        <UserContext.Provider value={response}>
            {Children}
        </UserContext.Provider>
    );

}

export default UserProvider;