import React from "react"
import { useParams } from "react-router-dom"

export default function Newpassword(){

    const { otp,email }=useParams();

    const changepassword=async(event)=>{
      event.preventDefault();
      
      try{
            
      }

      catch(error){

      }



    }

    return( 

    <div>
        <h1>OTP Verification</h1>
        <p>OTP: {otp}</p>
        <p>Email: {email}</p>
      </div>


    )
}