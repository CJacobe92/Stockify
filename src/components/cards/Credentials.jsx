import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider';
import fetchUpdateUserData from '../../services/fetchUpdateUserData';
import { useNavigate } from 'react-router-dom';
import fetchLogout from '../../services/fetchLogout';
import useAuth from '../../hooks/useAuth';

const Credentials = () => {

  const { state, dispatch } = useContext(DataContext)
  const navigate = useNavigate()
  const {currentUser, token, signOut} = useAuth();
  
  const [credentials, setCredentials] = useState({
    password: '',
    password_confirmation: ''
  })

  const [message, setMessage] = useState('');
  const [matched, setMatched] = useState(false)

  const [isDataEdited, setDataEdited] = useState(false)

  const handleChange = (e) => {
    const {name, value} = e.target
    setCredentials({...credentials, [name]: value})
    setDataEdited(true)
  }

  const handleUpdate = async() => {
    if(isDataEdited && matched && currentUser && token){
      const response = await fetchUpdateUserData(currentUser, token, credentials)
      
      if(response.ok){
        const response = await fetchLogout(currentUser, token)
        if(response.ok){
          signOut()
          navigate('/login')
        }
      }
    }else{
      console.error('Invalid action')
    }
  }
  
  useEffect(() => {
    const confirmPasswords = () => {
      if(credentials.password !==  credentials.password_confirmation){
        setMessage('Password does not match')
        setMatched(false)
      }else if(credentials.password === credentials.password_confirmation){
        setMessage('')
        console.log('Password matched')
        setMatched(true)
      }
    }
    confirmPasswords()
  }, [credentials])

  return (
    <div className='p-2 m-2 bg-white w-96'>
      <fieldset className='p-2 text-indigo-700 border border-indigo-700'>
        <legend className='font-semibold'>Credentials</legend>
        <div className='my-2 text-sm'>
          <label className='text-xs font-semibold'>New Password</label>
          <input onChange={handleChange} type="password" name="password" className='w-full p-1 border border-indigo-700 outline-none' autoComplete='off'/>
        </div>
        <div className='my-1 text-sm'>
          <label className='text-xs font-semibold'>Confirm New Password</label>
          <input onChange={handleChange} type="password" name="password_confirmation" className='w-full p-1 border border-indigo-700 outline-none' autoComplete='off'/>
        </div>
        <div className='h-2 mb-4 text-xs font-semibold text-red-600'>{message}</div>
        <div>
          <button onClick={handleUpdate} className='w-full p-2 text-sm text-white bg-indigo-900'>Update Password</button>
        </div>
        
      </fieldset>
    </div>
  )
}

export default Credentials