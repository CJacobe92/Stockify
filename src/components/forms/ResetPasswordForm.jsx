import React, { useEffect, useState } from 'react'
import fetchPasswordReset from '../../services/fetchPasswordReset';
import { useNavigate } from 'react-router-dom';

const ResetPasswordForm = () => {

  const [formData, setFormData] = useState({ email: '' });
  const [error, setError] = useState(null)
  const [message, setMessage ] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {value} = e.target
    setFormData({...formData, email: value})
    setIsTyping(true)
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      try{
        if(formData.email == ''){
          setError(true)
          setMessage('Email address cannot be empty.')
          return
        }else{
          const response = await fetchPasswordReset(formData)
          if(response.error){
            setError(true)
            setMessage(response.error)
          }else{
            setError(false)
            setMessage(response.message)
            setTimeout(() => {navigate('/login')}, 1500)
          }
        }
      }catch(error){
      
    }
  }

  const renderMessage  = () => {
    switch(error){
      case true:
        return(<div className='text-red-700'>{message}</div>);
      case false:
        return(<div className='text-green-700'>{message}</div>);

      default:
        return null
    }
  }

  useEffect(() =>{
    if(isTyping === true){
      setError(false)
      setMessage('')
    }
  }, [formData, isTyping])


  return (
    <form className='flex flex-col justify-center p-4 bg-white rounded-md w-96 flex-item-center' onSubmit={handleSubmit}>
      <h1 className='mt-4 text-3xl font-bold text-center text-indigo-900'>Stockify</h1>
      <p className='mt-2 text-2xl font-semibold text-center text-indigo-700'>Reset Your Password</p>
      <p className='pt-6 text-xs text-gray-800'>Enter your email address. If your account exists in our system a password reset link
        will be automatically sent to your email.</p>
      <div className='h-4 my-2 text-xs font-semibold'>
       {renderMessage()}
      </div>
      <input onChange={handleChange} type="email" id="email" className='p-2 font-semibold text-indigo-700 border-2 border-indigo-800 rounded-md outline-none'/>
      <button type='submit' className='p-2 mt-4 font-semibold text-white bg-indigo-700 rounded-sm'>Submit</button>
    </form>
  )
}

export default ResetPasswordForm