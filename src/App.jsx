import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { GlobalContextProvider } from './providers/GlobalContextProvider'
import Landing from './pages/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Review from './pages/auth/Review'
import EnableOTP from './pages/auth/EnableOTP'
import VerifyOTP from './pages/auth/VerifyOTP'
import Activate from './pages/auth/Activate'
import Portfolio from './pages/app/Portfolio'
import Layout from './pages/Layout'
import Trade from './pages/app/Trade'
import Account from './pages/app/Account'

const App = () => {
  return (
   
      <GlobalContextProvider>
        <Routes>
          <Route path={'/'} element={<Landing />}/>
          <Route path={'/register'} element={<Register />}/>
          <Route path={'/login'} element={<Login />}/>
          <Route path={'/review'} element={<Review />}/>
          <Route path={'/enableotp'} element={<EnableOTP />}/>
          <Route path={'/verifyotp'} element={<VerifyOTP />}/>
          <Route path={'/api/v1/auth/activate'} element={<Activate />}/>
          <Route element={<Layout />}>
            <Route path={'/portfolio'} element={<Portfolio />}/>
            <Route path={'/trade'} element={<Trade />}/>
            <Route path={'/account'} element={<Account />}/>
          </Route>
        </Routes>
      </GlobalContextProvider>
      
  )
}

export default App