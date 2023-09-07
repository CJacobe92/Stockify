import React, { useContext, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import Register from './pages/auth/Register'
import Login from './pages/auth/Login'
import Activate from './pages/auth/Activate'
import Portfolio from './pages/app/Portfolio'
import Account from './pages/app/Account'
import Transaction from './pages/app/Transaction'
import EnableOTP from './pages/auth/EnableOTP'
import VerifyOTP from './pages/auth/VerifyOTP'
import Review from './pages/auth/Review'
import Reset from './pages/auth/Reset'
import Update from './pages/auth/Update'
import UserLayout from './pages/UserLayout'
import AdminLayout from './pages/AdminLayout'
import { DataContext } from './providers/DataContextProvider'
import Approvals from './pages/admin/Approvals'
import Transactions from './pages/admin/Transactions'
import Dashboard from './pages/admin/Dashboard'

const App = () => {

  return (
     <Routes>
      <Route path={'/'} element={<Landing />}/>
      <Route path={'/register'} element={<Register />}/>
      <Route path={'/login'} element={<Login />}/>
      <Route path={'/api/v1/auth/activate'} element={<Activate />}/>
      <Route path={'/enableotp'} element={<EnableOTP />} />
      <Route path={'/verifyotp'} element={<VerifyOTP />} />

      <Route path={'/review'} element={<Review />} />
      <Route path={'/reset'} element={<Reset />}/>
      <Route path={'/api/v1/auth/password_update'} element={<Update />}/>
      <Route element={<UserLayout />}>
        <Route path={'/portfolio'} element={<Portfolio />}/>
        <Route path={'/transaction'} element={<Transaction />}/>
        <Route path={'/account'} element={<Account />}/>
        
      </Route> 
      <Route element={<AdminLayout />}>
        <Route path={'/dashboard'} element={<Dashboard/>} />
        <Route path={'/approvals'} element={<Approvals />} />
        <Route path={'/transactions'} element={<Transactions />} />
      </Route>
    </Routes>
  )
}

export default App