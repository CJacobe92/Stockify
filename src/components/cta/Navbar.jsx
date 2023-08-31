import React, { useContext, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../providers/GlobalContextProvider';
import fetchLogout from '../../services/fetchLogout';
import useRefetchData from '../../hooks/useRefetchData';
import LogoutIcon from '@mui/icons-material/Logout';


const Navbar = () => {

  const { state, dispatch} = useContext(GlobalContext)
  const [activeLink, setActiveLink] = useState('/portfolio')
  const {uid, auth} = state

  const location = useLocation();
  
  const { refetch } = useRefetchData()

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try{
      const responseData = await fetchLogout(uid, auth)

      if(responseData.ok){
        dispatch({type: 'LOGOFF'})
        navigate('/login')
      }
    }catch(error){
      console.error(error)
    }
  }

  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location]);
  
  return (
    <div className='text-white h-[10vh] border-b-4 border-indigo-700 flex flex-row items-end justify-between px-10'>
      <h1 className='mx-2 mb-2 text-3xl font-bold text-center text-indigo-300'>Stockify</h1>
      <div className='flex flex-row mx-2'>
        <Link onClick={refetch} className={`${activeLink === '/portfolio' ? 'bg-indigo-700': ''} mx-2 px-2 py-2 text-xl font-semibold hover:bg-indigo-500 rounded-t-lg`} to={'/portfolio'}>Portfolio</Link>
        <Link onClick={refetch} className={`${activeLink === '/transaction' ? 'bg-indigo-700': ''} mx-2  px-2 py-2 text-xl font-semibold hover:bg-indigo-500 rounded-t-lg`} to={'/transaction'}>Transactions</Link>
        <Link onClick={refetch} className={`${activeLink === '/acount' ? 'bg-indigo-700': ''} mx-2 px-2 py-2 text-xl font-semibold hover:bg-indigo-500 rounded-t-lg`} to={'/account'}>Account</Link>
        <button className='mx-2 mb-1 text-indigo-400' onClick={handleLogout}><LogoutIcon style={{fontSize: '2rem', fontWeight: 'bolder'}}/></button>
      </div>
      
     
    </div>
  )
}

export default Navbar