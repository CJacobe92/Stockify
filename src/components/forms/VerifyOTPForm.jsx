import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import verify from '../../assets/verify.jpg'
import { GlobalContext } from '../../providers/GlobalContextProvider'
import fetchVerifyOTP from '../../services/fetchVerifyOTP'
import FetchLoading from '../spinners/FetchLoading'

const VerifyOTPForm = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const inputRefs = Array.from({ length: 6 }, () => useRef(null))
  const {state, dispatch} = useContext(GlobalContext)
  const {uid, auth} = state
  
  const [digits, setDigits] = useState  ({
    digit0: '',
    digit1: '',
    digit2: '',
    digit3: '',
    digit4: '',
    digit5: ''
  })
  
  const navigate = useNavigate();
  
  const handleChange = (index, e) => {
    const {name, value} = e.target
    
    if(value.length === 1 && index < inputRefs.length - 1){
      inputRefs[index + 1].current.focus();
    }
    setDigits({...digits, [name]: value})
  }
  
  const handleKeyDown = (index, e) => {
    const value = e.target.value
    
    if(e.key === 'Backspace' && index > 0 && value.length === 0 ){
      inputRefs[index - 1].current.focus(); 
    }
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    try{

      setIsLoading(true)
      
      const pin = Object.values(digits).join('')
      const data = await fetchVerifyOTP(uid, auth, pin)

      if(data.auth != null){

        dispatch({type: 'SET_UID', uid: data.uid})
        dispatch({type: 'SET_AUTH', auth: data.auth})

        navigate('/portfolio')
      }
    } catch(error) {
      setError(error)
    } finally {
      setIsLoading(false)
      
    }
  }

  return (
    isLoading ? <FetchLoading /> :
    <form className='flex flex-row justify-center bg-white rounded-sm shadow-md' onSubmit={handleSubmit}>
      <div className='p-4 mt-10 mb-10 w-96'>
        <div className='m-2 mb-6 text-center'>
          <h1 className='text-3xl font-bold text-center text-indigo-500'>Stockify</h1>
          <p className='m-1 text-xs text-gray-600'>"Trade. Thrive. Triumph."</p>
          <p className='mt-4 mb-2 text-xl font-bold text-gray-700'>Two factor authentication.</p>
        </div>
        <div className='flex flex-col items-center justify-center px-4'>
          <p className='m-2 text-sm font-bold text-gray-700'>Enter your verification code:</p>
          <div className='flex flex-row my-2'>
            {
              inputRefs && inputRefs.map((ref, index) => 
              <input 
                autoFocus={index === 0 ? true : false}
                key={index}
                type="text"
                name={`digit${index}`}
                value={digits.value}
                maxLength='1' 
                ref={ref} 
                className='otp__input'
                onChange={(e) => handleChange(index, e)}
                onKeyDown={(e) => handleKeyDown(index, e)}/>  
            )}
          </div>
          <button type='submit' className='w-full p-2 m-2 text-white bg-indigo-900'>Verify</button>
          <p className='m-2 text-xs text-center text-gray-500'>Open your authenticator app and enter the code for Stockify.</p>
          
        </div>
           
      </div>

      <div className='bg-gray-900 rounded-r-sm w-52'>
        <img src={verify}
        className='object-cover h-full rounded-r-sm w-60'/>
      </div>
  </form>
  )
}

export default VerifyOTPForm