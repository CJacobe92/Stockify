import React, { useContext, useEffect, useState } from 'react'
import EnableOTPForm from '../../components/forms/EnableOTPForm'
import {useFetchEnableOTP } from '../../providers/ApiFetch'
import FetchLoading from '../../components/spinners/FetchLoading';

const EnableOTP = () => {
  
  const {mutate, isLoading, isFetching} = useFetchEnableOTP();
  
  const [pin, setPin] = useState()

  const handleSubmit = (e) => {
    e.preventDefault();
    try{
      mutate(pin)
    }catch(error){
      console.error(error)
    }
  }

  return (
    <>
      {isLoading || isFetching ? <FetchLoading /> :
        <div className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
         <EnableOTPForm 
          setPin={setPin}
          handleSubmit={handleSubmit}/>
        </div>
      }
    </> 
    
    
   
  )
}

export default EnableOTP