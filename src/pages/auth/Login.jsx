import React, { useContext, useEffect, useState } from 'react'
import LoginForm from '../../components/forms/LoginForm';
import FetchLoading from '../../components/spinners/FetchLoading';
import { useNavigate } from 'react-router-dom';
import { DataContext } from '../../providers/DataContextProvider';
import { fetchLogin } from '../../services/fetchLogin';

const Login = () => {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [isTyping, setIsTyping] = useState(false)
  const {dispatch} = useContext(DataContext)
  
  // Hooks
  const navigate = useNavigate()
  const { mutate, isLoading, error} = fetchLogin()
  
  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
    setIsTyping(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
      
      mutate(formData, {
        onSuccess: (data) => {

          dispatch({
            type: 'SET_ROOT', 
            uid: data.uid,
            auth: data.auth,
            user_type: data.user_type
          })
          

          if(data.user_type === 'Admin'){
            
            navigate('/dashboard')
    
          }else if(data.user_type === 'User'){
            if(data.activated === "false"){
              navigate('/review')
              return
            }
    
            if(data.activated === 'true' && data.otp_enabled === 'false'){
              navigate('/enableotp');
              return
            }
    
            if(data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'true'){
              navigate('/verifyotp');
              return
            }
    
            if(data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'false'){
              navigate('/portfolio');
            }
          }

      
        }
      })
  };

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