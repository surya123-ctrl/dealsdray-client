import React, { useState } from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';
import Login from './pages/Login/Login';
import { AuthContext } from './contexts/AuthContext'
import './App.css'
import PageNotFound from './pages/PageNotFound/PageNotFound';
import EmployeeDetails from './pages/EmployeeDetails/EmployeeDetails';
import UpdateEmployee from './pages/UpdateEmployee/UpdateEmployee';
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token"));
  console.log('in app', isLoggedIn)
  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<CreateEmployee />} />
            {!isLoggedIn ? (
              <Route path='/login' element={<Login />} />
            ) : (
              <Route path='/page-not-found' element={<PageNotFound />} />
            )}
            <Route path='/employee-details' exact element={<EmployeeDetails />} />
            <Route path='/edit-employee/:id' exact element={<UpdateEmployee />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
