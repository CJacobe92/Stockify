import React from 'react'
import { Link } from 'react-router-dom'

const RegisterForm = ({handleChange, handleSubmit, formData}) => {
  return(
    <form className='flex flex-col justify-center w-96' onSubmit={handleSubmit}>
      <div className='m-2 text-center'>
        <h1 className='font-bold text-3xl text-center text-indigo-900'>Stockify</h1>
        <p className='text-xs m-1 text-gray-600'>"Trade. Thrive. Triumph."</p>
        <p className='text-xl font-bold mt-4 mb-2 text-gray-700'>Sign up for an account.</p>
        <p className='text-xs font-semibold text-gray-600 mb-2'>Already have an account? <Link to={'/login'} className='text-indigo-900 font-bold'>Sign in.</Link></p>
      </div>
      
      <div className='flex flex-row'>
        <div className='m-2'>
          <label htmlFor="firstname" className='text-xs text-gray-700 font-semibold'>Firstname</label>
          <input 
            type="text" 
            name="firstname" 
            id="firstname" 
            value={formData.firstname}
            onChange={handleChange}
            className='border border-black border-opacity-30 w-full p-1 rounded-sm outline-indigo-900'/>
          </div>
          <div className='m-2'>
          <label htmlFor="lastname" className='text-xs text-gray-700 font-semibold'>Lastname</label>
          <input 
            type="text" 
            name="lastname" 
            id="lastname" 
            value={formData.lastname}
            onChange={handleChange}
            className='border border-black border-opacity-30 w-full p-1 rounded-sm outline-indigo-900'/>
          </div>
      </div>
      <div className='m-2'>
        <label htmlFor="password_confirmation" className='text-xs text-gray-700 font-semibold'>Email</label>
        <input 
            type="email" 
            name="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            className='border border-black border-opacity-30 w-full p-1 rounded-sm outline-indigo-900'/>
      </div>
      <div className='m-2'>
        <label htmlFor="password" className='text-xs text-gray-700 font-semibold'>Password</label>
        <input 
            type="password" 
            name="password" 
            id="password" 
            value={formData.password}
            onChange={handleChange}
            className='border border-black border-opacity-30 w-full p-1 rounded-sm outline-indigo-900'/>
      </div>
      <div className='m-2'>
        <label htmlFor="password_confirmation" className='text-xs text-gray-700 font-semibold'>Confirm Password</label>
        <input 
            type="password" 
            name="password_confirmation" 
            id="password_confirmation" 
            value={formData.password_confirmation}
            onChange={handleChange}
            className='border border-black border-opacity-30 w-full p-1 rounded-sm outline-indigo-900'/>
      </div>
      <div className='m-2'>
        <button type='submit' className='w-full bg-indigo-900 p-2 text-white rounded-sm shadow-lg'>Sign Up</button>
      </div>
      <div className='m-2 text-xs text-center text-gray-600'>
        <p>By signing up you agree with our privacy terms and conditions.</p>
      </div>
   
    </form>
  )
}

export default RegisterForm