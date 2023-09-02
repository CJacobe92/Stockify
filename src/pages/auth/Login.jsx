import React, { useContext, useEffect, useState } from 'react'
import LoginForm from '../../components/forms/LoginForm';
import FetchLoading from '../../components/spinners/FetchLoading';
import { useNavigate } from 'react-router-dom';
import fetchLogin from '../../services/fetchLogin';
import { DataContext } from '../../providers/DataContextProvider';
import Review from './Review';
import EnableOTP from './EnableOTP';
import VerifyOTP from './VerifyOTP';

const Login = () => {

  const [formData, setFormData] = useState({email: '', password: ''})
  const [error, setError] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Hooks
  const navigate = useNavigate()
  const { signIn } = useContext(DataContext)
  
  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
    setIsTyping(true)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
  
      const response = await fetchLogin(formData);
      const uid = response.uid;
      const auth = response.auth;
  
      signIn(uid, auth);

      console.log(response)
  
      if (response.error) {
        setError(response.error);
      } else {
        setIsTyping(false);
  
        // Use a switch statement to determine the route to navigate to
        switch (true) {
          case response.activated === 'false':
            navigate('/review');
            break;
  
          case response.activated === 'true' && response.otp_enabled === 'false':
            navigate('/enableotp');
            break;
  
          case response.activated === 'true' && response.otp_enabled === 'true' && response.otp_required === 'true':
            navigate('/verifyotp');
            break;
  
          case response.activated === 'true' && response.otp_enabled === 'true' && response.otp_required === 'false':
            navigate('/portfolio');
            break;
  
          default:
            // Handle any other cases here
            break;
        }
      }
    } catch (error) {
      setError(error);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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