import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApprovalIcon from '@mui/icons-material/Approval';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AdminProfile from '../cards/AdminProfile';
import fetchLogout from '../../services/fetchLogout';
import { DataContext } from '../../providers/DataContextProvider';

const Sidebar = () => {

  const navigate = useNavigate();
  const { mutate } = fetchLogout();

  const handleLogout = () => {
    mutate({navigate})
  }

  return (
    <div className='flex flex-col text-black bg-indigo-900 min-h-screen w-[72] justify-start items-center'>
      <AdminProfile />
      <div className='flex flex-col px-4 my-4 text-white'>
        <Link to={'/dashboard'} className='flex flex-row my-2'>
          <DashboardIcon />
          <p className='ml-2'>Dashboard</p> 
        </Link>
        <Link to={'/approvals'} className='flex flex-row my-2'>
          <ApprovalIcon />
          <p className='ml-2'>Approvals</p>
        </Link>
        <Link to={'/transactions'} className='flex flex-row my-2'>
          <ListAltIcon />
          <p className='ml-2'>Transactions</p>
        </Link>
      </div>
      <div className='px-4 mt-auto mb-4'>
          <button onClick={handleLogout}className='text-white'>Logout</button>
      </div>
      
    </div>
  )
}

export default Sidebar