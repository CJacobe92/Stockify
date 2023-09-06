import React, { useContext } from 'react'
import Navbar from '../components/cta/Navbar'
import { Navigate, Outlet } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import useAuth from '../hooks/useAuth';
import { DataContext } from '../providers/DataContextProvider';

const UserLayout = () => {
  const isAuthenticated = useAuth()
  
  const {state} = useContext(DataContext)
  const user_type = state?.user_type


  return isAuthenticated && user_type == 'User' ? (
    <div className='flex flex-col w-full min-h-screen text-white bg-gray-900'>
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default UserLayout