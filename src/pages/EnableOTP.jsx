import React, { useContext, useEffect, useState } from 'react'
import EnableOTPForm from '../components/forms/EnableOTPForm'
import { GlobalContext } from '../providers/GlobalContextProvider'
import { fetchConfigureOTP, fetchEnableOTP } from '../providers/ApiFetch'
import { useNavigate } from 'react-router-dom'

const EnableOTP = () => {
  const {state, dispatch} =  useContext(GlobalContext)
  const [data, setData] = useState();
  const [pin, setPin] = useState()
  const navigate = useNavigate();
  
  

  useEffect(() => {
    const getOTPData = async() => {
      const response = await fetchConfigureOTP(state.uid, state.auth);
      setData(response)
    }
    getOTPData();
    
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await fetchEnableOTP(state.uid, state.auth, pin)
      
      if(response.ok){

        dispatch({type: 'SET_UID', uid: response.uid})
        dispatch({type: 'SET_AUTH', auth: response.auth})
      
        navigate('/dashboard')
      }else{
        console.error(response)
      }
    }catch(error){
      
    }
  }

  return (
    <div className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
       <EnableOTPForm 
        data={data}
        setPin={setPin}
        handleSubmit={handleSubmit}/>
    </div>
   
  )
}

export default EnableOTP