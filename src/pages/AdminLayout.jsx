import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useGetData from '../hooks/useGetData';
import useAuth from '../hooks/useAuth';
import AdminNavbar from '../components/cta/AdminNavbar';

const AdminLayout = () => {
  const isAuthenticated = useAuth();
  
  return isAuthenticated ? (
    <div className='flex flex-col w-full min-h-screen text-white bg-gray-900'>
      <AdminNavbar />
      <Outlet />
    </div>
  ) : (
    <Navigate to={'/login'} />
  )
}

export default AdminLayout