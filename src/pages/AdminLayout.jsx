import React, { useCallback, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import Sidebar from '../components/cta/Sidebar';
import { storage } from '../services/utils';

const AdminLayout = () => {
  const isAuthenticated = useAuth();

  const isAdmin = storage.isAdmin();
  
  return isAuthenticated && isAdmin === true ? (
    <div className='flex flex-row w-full min-h-screen text-white bg-gray-900 justify-centers item-center'>
      <Sidebar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default AdminLayout