import React from 'react';
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from "./components/Home";
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import './app.css'
import UserDashBoard from './components/UserDashBoard';
import UserProfileSetting from './components/UserProfileSetting';
import AdminDashBoard from './components/AdminDashboard';


function App() {
  return (
   <div className='app overflow-x-hidden'>
    
      <Router>
         <Routes>
           <Route path='/' exact element={<Home />} />
           <Route path='/register'  element={<Register />} />
           <Route path='/login'  element={<Login />} />
           <Route path='/dashboard'  element={<UserDashBoard />} />
           <Route path='/admindashboard'  element={<AdminDashBoard />} />
           <Route path='/dashboard/setting'  element={<UserProfileSetting />} />

         </Routes>
        <Footer />
        </Router>
    </div>
  );
}

export default App;