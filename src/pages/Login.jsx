import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';
import { fetchLogin } from '../providers/ApiFetch';
import { GlobalContext } from '../providers/GlobalContextProvider';
import VerifyOTPForm from '../components/forms/VerifyOTPForm';


const Login = () => {
  
  const { dispatch } = useContext(GlobalContext)
  const [showVerifyOTP, setShowVerifyOTP] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
      const response = await fetchLogin(formData, null)

      if (response.ok){
        dispatch({type: 'SET_UID', uid: response.uid})
        dispatch({type: 'SET_AUTH', auth: response.auth})
      }

      if (response.activated === "false"){
        navigate('/review')
      }else if (response.activated === 'true' && response.otp_enabled === 'false'){
        navigate('/enableotp')
      }else if(response.activated === 'true' && response.otp_enabled === 'true'){
        navigate('/verifyotp')
      }
    }catch(error){
      console.error(error)
    }
  }

  return (
    <section className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      <LoginForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}/>
    </section>
  )
}

export default Login