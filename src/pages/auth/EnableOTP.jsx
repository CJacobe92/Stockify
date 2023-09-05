import React, { useContext, useEffect, useState } from 'react'
import EnableOTPForm from '../../components/forms/EnableOTPForm'
import FetchLoading from '../../components/spinners/FetchLoading';
import { DataContext } from '../../providers/DataContextProvider';
import fetchEnableOTP from '../../services/fetchEnableOTP';
import { useNavigate } from 'react-router-dom';

const EnableOTP = () => {

  const [showError, setshowError] = useState(null)
  const [pin, setPin] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const {mutate, isLoading} = fetchEnableOTP();
  
  const navigate = useNavigate();
  
  const handleSubmit = async(e) => {
    e.preventDefault();

    if(pin === ''){
      setshowError('Please enter your pin')
      return
    }else{
      mutate(pin, {
        onSuccess: () => {
          navigate('/portfolio')
        },
        onError: (error) => {
          setshowError(error)
        }
      })
    }   
 }

  return (
    isLoading ? <FetchLoading /> :
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      <EnableOTPForm 
      setPin={setPin}
      handleSubmit={handleSubmit}
      showError={showError}
      setshowError={setshowError}
      isTyping={isTyping}
      setIsTyping={setIsTyping}/>
    </div>
  )
}

export default EnableOTP