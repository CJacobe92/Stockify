import React, { useCallback, useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import useAuth from '../hooks/useAuth';
import AdminNavbar from '../components/cta/AdminNavbar';
import Sidebar from '../components/cta/Sidebar';
import { DataContext } from '../providers/DataContextProvider';

const AdminLayout = () => {
  const isAuthenticated = useAuth();

  const isAdmin = JSON.parse(localStorage.getItem('root'))?.isAdmin

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