import React,{ Children, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./Context";

const ProtectedRoute=({children})=>{
    
    const { login }=useContext(AuthContext)

    if(!login){
        return <Navigate to="/login" />;
    }
    return children;
};

export default ProtectedRoute;
