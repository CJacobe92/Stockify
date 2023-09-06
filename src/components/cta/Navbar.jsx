import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import fetchLogout from '../../services/fetchLogout';
import LogoutIcon from '@mui/icons-material/Logout';
import { DataContext } from '../../providers/DataContextProvider';

const Navbar = () => {

  const [activeLink, setActiveLink] = useState('/portfolio')
  const location = useLocation();
  const navigate = useNavigate();
  const { mutate } = fetchLogout();
  const {dispatch} = useContext(DataContext)
  
  const handleLogout = () => {
    mutate({navigate, dispatch})
  }

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  
  return (
    <div className='text-white h-[10vh] border-b-4 border-indigo-700 flex flex-row items-end justify-between px-10'>
      <h1 className='mx-2 mb-2 text-3xl font-bold text-center text-indigo-300'>Stockify</h1>
      <div className='flex flex-row mx-2'>
        <Link className={`${activeLink === '/portfolio' ? 'bg-indigo-700': ''} mx-2 px-2 py-2 text-xl font-semibold hover:bg-indigo-500 rounded-t-lg`} to={'/portfolio'}>Portfolio</Link>
        <Link className={`${activeLink === '/transaction' ? 'bg-indigo-700': ''} mx-2  px-2 py-2 text-xl font-semibold hover:bg-indigo-500 rounded-t-lg`} to={'/transaction'}>Transactions</Link>
        <Link className={`${activeLink === '/acount' ? 'bg-indigo-700': ''} mx-2 px-2 py-2 text-xl font-semibold hover:bg-indigo-500 rounded-t-lg`} to={'/account'}>Account</Link>
        <button className='mx-2 mb-1 text-indigo-400' onClick={handleLogout}><LogoutIcon style={{fontSize: '2rem', fontWeight: 'bolder'}}/></button>
      </div> 
    </div>
  )
}

export default Navbar