import React, { useContext, useEffect, useState } from 'react'
import EnableOTPForm from '../../components/forms/EnableOTPForm'
import FetchLoading from '../../components/spinners/FetchLoading';
import fetchConfigureOTP from '../../services/fetchConfigureOTP';
import { DataContext } from '../../providers/DataContextProvider';
import fetchEnableOTP from '../../services/fetchEnableOTP';
import { useNavigate } from 'react-router-dom';

const EnableOTP = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pin, setPin] = useState()
  
  const {state, dispatch} = useContext(DataContext)
  const {uid, auth} = state

  const navigate = useNavigate();

  const regex = /^\d+$/;
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {
      
      if(uid && auth){
        
        const data = await fetchEnableOTP(uid, auth, pin)
        
        if(data.auth != null){
          setIsLoading(true)
          
          dispatch({type: 'SET_AUTH', auth: data.auth})
          dispatch({type: 'SET_UID', uid: data.uid})

          navigate('/portfolio')
        }
       
      }
     
    } catch(error) {
      setError(error)
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    isLoading ? <FetchLoading /> :
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      <EnableOTPForm 
      setPin={setPin}
      handleSubmit={handleSubmit}/>
    </div>
  )
}

export default EnableOTP