import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchLogout } from '../../providers/ApiFetch'
import { GlobalContext } from '../../providers/GlobalContextProvider';
import { useQueryClient } from '@tanstack/react-query';

const Navbar = () => {
  const { mutate }= useFetchLogout()

  
  const handleLogout = () => {
    try{
      mutate()
      // dispatch({type: 'LOGOFF'})
      // navigate('/login')
      console.log('clicked')
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