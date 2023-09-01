import React, { useContext, useEffect, useState } from 'react'
import LoginForm from '../../components/forms/LoginForm';
import FetchLoading from '../../components/spinners/FetchLoading';
import { useNavigate } from 'react-router-dom';
import fetchLogin from '../../services/fetchLogin';
import useAuth from '../../hooks/useAuth';

const Login = () => {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [error, setError] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Hooks
  const navigate = useNavigate()
  const { signIn } = useAuth()
  
  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
    setIsTyping(true)
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      setIsLoading(true)
 
      const response = await fetchLogin(formData)
      const currentUser = response.uid
      const auth = response.auth
      
      signIn(currentUser, auth)
      
      if(response.error){
        setError(response.error)
      }else {
        setIsTyping(false)

        if (response.activated === 'false') {
          navigate('/review')
        } 
  
        // If activated route to otp setup page
        if (response.activated === 'true' && response.otp_enabled === 'false') {
          navigate('/enableotp')
        } 
        
        // If the user is required to enter his OTP e.g. after logout
        if (response.activated === 'true' && response.otp_enabled === 'true' && response.otp_required === 'true') {
          navigate('/verifyotp')
        } 
        
        // If the user already verified his OTP route to portfolio page
        if (response.activated === 'true' && response.otp_enabled === 'true' && response.otp_required === 'false') {
          navigate('/portfolio')
        }
      }
      
    }catch(error){
      setError(error)
      console.error()
    }finally {
      setIsLoading(false)
    } 
  }

  useEffect(() => {
    if(isTyping){
      setError('')
    }
  }, [formData])

  
  return (isLoading ? <FetchLoading /> :
    <section className='flex items-center justify-center w-full min-h-screen bg-gray-900'>

        <LoginForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
        error={error}/>
      
      
    </section>
  )
}

export default Login