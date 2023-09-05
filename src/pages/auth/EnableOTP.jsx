import React, { useContext, useEffect, useState } from 'react'
import EnableOTPForm from '../../components/forms/EnableOTPForm'
import FetchLoading from '../../components/spinners/FetchLoading';
import { DataContext } from '../../providers/DataContextProvider';
import fetchEnableOTP from '../../services/fetchEnableOTP';
import { useNavigate } from 'react-router-dom';

const EnableOTP = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [pin, setPin] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  
  const {currentUser, auth, signIn} = useContext(DataContext)

  const navigate = useNavigate();

  const regex = /^\d+$/;
  
  const handleSubmit = async(e) => {
    e.preventDefault();
    
    try {

      if(pin === ''){
        setError('Please enter your pin')
        return
      }else if(currentUser && auth){
        
        const data = await fetchEnableOTP(currentUser, auth, pin)

        if(data.auth != null){
          const uid = data.uid
          const auth = data.auth
          const userType =  data.userType
          setIsLoading(true)
          signIn(uid, auth, userType)
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