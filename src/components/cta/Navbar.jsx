import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../../providers/GlobalContextProvider';
import fetchLogout from '../../services/fetchLogout';


const Navbar = () => {

  const { state, dispatch} = useContext(GlobalContext)
  const {uid, auth} = state

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
  
  return (
    <div className='text-white h-[10vh] border-b border-white flex flex-row items-end justify-between px-36'>
      <div className='flex flex-row m-2'>
        <Link className='mx-2 text-xl font-semibold' to={'/portfolio'}>Portfolio</Link>
        <Link className='mx-2 text-xl font-semibold' to={'/trade'}>Trade</Link>
        <Link className='mx-2 text-xl font-semibold' to={'/account'}>Account</Link>
      </div>
      <h1 className='m-2 text-2xl font-bold text-center text-indigo-500'>Stockify</h1>
      <button className='p-2 m-2 bg-indigo-900' onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Navbar