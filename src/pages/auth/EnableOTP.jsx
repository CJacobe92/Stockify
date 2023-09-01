import React, { useContext, useEffect, useState } from 'react'
import EnableOTPForm from '../../components/forms/EnableOTPForm'
import FetchLoading from '../../components/spinners/FetchLoading';
import fetchConfigureOTP from '../../services/fetchConfigureOTP';
import { DataContext } from '../../providers/DataContextProvider';
import fetchEnableOTP from '../../services/fetchEnableOTP';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const EnableOTP = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pin, setPin] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const {state, dispatch} = useContext(DataContext)
  const { currentUser, token, signIn} = useAuth();

  const navigate = useNavigate();

  const regex = /^\d+$/;
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {

      if(pin === ''){
        setError('Please enter your pin')
        return
      }else if(currentUser && token){
        
        const data = await fetchEnableOTP(currentUser, token, pin)

        if(data.auth != null){
          setIsLoading(true)
          signIn(data.uid, data.auth)
          navigate('/portfolio')
        
        }else{
          setIsTyping(false)
          setError(data.result.error)
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
      handleSubmit={handleSubmit}
      error={error}
      setError={setError}
      isTyping={isTyping}
      setIsTyping={setIsTyping}/>
    </div>
  )
}

export default EnableOTP