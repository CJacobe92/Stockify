import React, { useContext } from 'react'
import Navbar from '../components/cta/Navbar'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { storage } from '../services/utils';
import fetchUserData from '../services/fetchUserData';

const UserLayout = () => {
  const isAuthenticated = useAuth()
  
  const isAdmin = storage.isAdmin();

  fetchUserData();
  
  return isAuthenticated && isAdmin === false ? (
    <div className='flex flex-col w-full min-h-screen text-white bg-gray-900'>
      <Navbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default UserLayout