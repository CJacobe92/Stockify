import React, { useContext, useState } from 'react'
import LoginForm from '../../components/forms/LoginForm';
import { GlobalContext } from '../../providers/GlobalContextProvider';
import FetchLoading from '../../components/spinners/FetchLoading';
import { useNavigate } from 'react-router-dom';
import fetchLogin from '../../services/fetchLogin';

const Login = () => {
  
  const [formData, setFormData] = useState({email: '', password: ''})
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const { dispatch } = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }


  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      setIsLoading(true)
 
      const data = await fetchLogin(formData)
      
      dispatch({type: 'SET_AUTH', auth: data.auth})
      dispatch({type: 'SET_UID', uid: data.uid})

      // Routing based on the user current status
    
      // If not activated route to the page for application review
      if (data.activated === 'false') {
        navigate('/review')
      } 

      // If activated route to otp setup page
      if (data.activated === 'true' && data.otp_enabled === 'false') {
        navigate('/enableotp')
      } 
      
      // If the user is required to enter his OTP e.g. after logout
      if (data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'true') {
        navigate('/verifyotp')
      } 
      
      // If the user already verified his OTP route to portfolio page
      if (data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'false') {
        navigate('/portfolio')
      }

    }catch(error){
      setError(error)
      console.error()
    }finally {
      setIsLoading(false)
     
    }
    
  }

  return (
    <section className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      {isLoading ? <FetchLoading /> :
        <LoginForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}/>
      }
      
    </section>
  )
}

export default Login