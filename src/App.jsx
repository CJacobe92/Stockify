import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Review from './pages/auth/Review'
import EnableOTP from './pages/auth/EnableOTP'
import VerifyOTP from './pages/auth/VerifyOTP'
import Activate from './pages/auth/Activate'
import Portfolio from './pages/app/Portfolio'
import Layout from './pages/Layout'
import Account from './pages/app/Account'
import Transaction from './pages/app/Transaction'
import { DataContextProvider } from './providers/DataContextProvider'

const App = () => {
  return (
      <DataContextProvider>
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
            <Route path={'/transaction'} element={<Transaction />}/>
            <Route path={'/account'} element={<Account />}/>
          </Route>
        </Routes>
      </DataContextProvider>
  )
}

export default App