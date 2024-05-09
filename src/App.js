import React from 'react'
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar'
import Home from './pages/Home/Home'
import CreateEmployee from './pages/CreateEmployee/CreateEmployee';
import './App.css'
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />} />
          {/* <Route path='/employee-details' exact element={<EmployeeDetails />} />
          <Route path='/login' exact element={<Login />} /> */}
          <Route path='/register' exact element={<CreateEmployee />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
