import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Review from './pages/Review'
import Login from './pages/Login'
import EnableOTP from './pages/EnableOTP'
import { GlobalContextProvider } from './providers/GlobalContextProvider'
import Activate from './pages/Activate'
import Dashboard from './pages/Dashboard'


const App = () => {
  return (
    <GlobalContextProvider>
      <Routes>
        <Route path={'/register'} element={<Register />}/>
        <Route path={'/login'} element={<Login />}/>
        <Route path={'/review'} element={<Review />}/>
        <Route path={'/enableotp'} element={<EnableOTP />}/>
        <Route path={'/api/v1/auth/activate'} element={<Activate />}/>
        <Route path={'/dashboard'} element={<Dashboard />}/>
      </Routes>
    </GlobalContextProvider>
  )
}

export default App