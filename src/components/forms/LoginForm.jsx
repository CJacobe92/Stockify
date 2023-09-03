import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import login from '../../assets/login.jpg'

const LoginForm = ({handleChange, handleSubmit, formData, error}) => {

  const navigate = useNavigate();
  
  const handleReset = () => {
    navigate('/reset')
  }

  return (
    <form className='flex flex-row justify-center bg-white rounded-sm shadow-md' onSubmit={handleSubmit}>

      <div className='p-4 mt-6 mb-10 w-96'>
        <div className='m-2 mb-2 text-center'>
          <h1 className='text-3xl font-bold text-center text-indigo-500'>Stockify</h1>
          <p className='m-1 text-xs text-gray-600'>"Trade. Thrive. Triumph."</p>
          <p className='mt-4 mb-2 text-xl font-bold text-gray-700'>Sign in to your account.</p>
          <p className='mb-2 text-xs font-semibold text-gray-600'>Don't have an account? <Link to={'/register'} className='font-bold text-indigo-900'>Sign up.</Link></p>
        </div>
        <div className='h-4 mx-2'>
          <span className='text-xs font-semibold text-red-600'>{error}</span>
        </div>
        <div className='m-2'>
          <label htmlFor="password_confirmation" className='text-xs font-semibold text-gray-700'>Email</label>
          <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            className='w-full p-1 border border-black rounded-sm border-opacity-30 outline-indigo-900'/>
        </div>
        <div className='m-2'>
          <label htmlFor="password" className='text-xs font-semibold text-gray-700'>Password</label>
          <input 
              type="password" 
              name="password" 
              id="password" 
              value={formData.password}
              onChange={handleChange}
              className='w-full p-1 border border-black rounded-sm border-opacity-30 outline-indigo-900'/>
          
        </div>
        <div className='flex flex-row justify-end mx-2 mt-2 text-xs font-semibold text-indigo-700'>
          <button onClick={handleReset} type='button'>Forgot password?</button>
        </div>
        <div className='mx-2 mt-2 mb-4'>
          <button type='submit' className='w-full p-2 text-white bg-indigo-900 rounded-sm shadow-lg'>Sign In</button>
        </div>
        <div className='m-2 text-xs text-center text-gray-600'>
          <p>By signing in you agree with our terms of service and conditions.</p>
        </div>
      </div>

      <div className='rounded-r-sm'>
        <img src={login}
        className='object-cover w-56 h-full rounded-r-sm'/>
      </div>
  </form>
  )
}

export default LoginForm