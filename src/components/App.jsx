import { useState } from 'react';  // Optional: If you plan to use useState
import reactLogo from '../assets/react.svg'; // Update the path to assets
import viteLogo from '/vite.svg'; // Update the path if needed or remove if not used
import '../App.css'; // Update the path to the CSS file
import Nav from './Nav.jsx'; // Correct import from the same folder
import Header from './Header_design.jsx';
import Imageslider from './Image-slider.jsx';
import Footer from './Footer.jsx';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login.jsx'
import Appointment from './Appointment.jsx';
import DataDashboard from './Data.jsx';
import Logout from './Logout.jsx';
import Dashboard from './Dashboard.jsx';
import Datamanagement from './Datamanagement.jsx';
import ViewData from './ViewData.jsx';
import { AuthProvider } from './Context.jsx';
import Customer_Data from './Customer_Dashboard.jsx';
import Customer_query from './Customer_query.jsx';
import CustomerSurvey from './Customer_survey.jsx';
import MeterRequest from './Meter_request.jsx';
import MeterArea from './Meter_installation_status.jsx';
import UpdateRequest from './UpdateRequest.jsx';
import Register from './Register.jsx'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import ProtectedRoute from './ProtectedRoute';
import Resetpassword from './Reset_password.jsx';
import Otp from './Otp.jsx';
import Newpassword from './Newpassword.jsx';
import { Profile } from './Profile.jsx';
import Profile_Location from './Profile_Location.jsx';
import Location from './Location.jsx';

function App() {
  return (
    <Router>
    <AuthProvider>
    <Nav />
    <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/Logout" element={<Logout />} />
        {/* <Route path="/profile" element={
            <ProtectedRoute>
              <Userprofile />
            </ProtectedRoute>
          } /> */}
        <Route path="/data" element={
            <ProtectedRoute>
              <DataDashboard />
            </ProtectedRoute>
          } />
        
        <Route path="/location/:id" element={
            <ProtectedRoute>
              <Location />
            </ProtectedRoute>
          } />


          <Route path="/customer_data" element={
            <ProtectedRoute>
              <Customer_Data />
            </ProtectedRoute>
          } />
          <Route path="/datamanagement" element={
            <ProtectedRoute>
              <Datamanagement />
            </ProtectedRoute>
          } />
          <Route path="/view/:id/:id2" element={
            <ProtectedRoute>
              <ViewData />
            </ProtectedRoute>
          } />

          <Route path="/view/:id" element={
            <ProtectedRoute>
              <ViewData />
            </ProtectedRoute>
          } />
          <Route path="/customerquery" element={
            <ProtectedRoute>
              <Customer_query />
            </ProtectedRoute>
          } />
          <Route path="/customersurvey" element={
            <ProtectedRoute>
              <CustomerSurvey />
            </ProtectedRoute>
          } />
          <Route path="/meterrequest" element={
            <ProtectedRoute>
              <MeterRequest />
            </ProtectedRoute>
          } />
          <Route path="/meterarea" element={
            <ProtectedRoute>
              <MeterArea />
            </ProtectedRoute>
          } />
          <Route path="/updaterequest" element={
            <ProtectedRoute>
              <UpdateRequest />
            </ProtectedRoute>
          } />

        <Route path="/profile" element={
          <ProtectedRoute>
          <Profile />
          </ProtectedRoute>
          } />

        <Route path="/profile_location/:id" element={
          <ProtectedRoute>
            <Profile_Location />
          </ProtectedRoute>
          } />
        


        <Route path="/register" element={<Register />} />      
        <Route path="/reset_password" element={<Resetpassword />} />      
        <Route path="/otp" element={<Otp />} />      
        <Route path="/newpassword/:otp/:email" element={<Newpassword />} />      

        <Route path="/" element={
          <>
            <Imageslider />
            {/* <Customer_Data /> */}
            <Appointment />
            <Dashboard />
          </>
        } />
        
      </Routes>
      <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
