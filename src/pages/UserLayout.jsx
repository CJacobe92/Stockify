import React from 'react'
import Navbar from '../components/cta/Navbar'
import { Navigate, Outlet } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import useAuth from '../hooks/useAuth';

const UserLayout = () => {
  const isAuthenticated = useAuth();
  
  return isAuthenticated ? (
    <div className='flex flex-col w-full min-h-screen text-white bg-gray-900'>
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default UserLayout