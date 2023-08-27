import React from 'react'
import { Link } from 'react-router-dom'
import register from '../../assets/register.jpg'

const RegisterForm = ({handleChange, handleSubmit, formData}) => {
  return(
    <form className='flex flex-row justify-center bg-white rounded-sm shadow-md' onSubmit={handleSubmit}>
      <div className='rounded-l-sm'>
        <img src={register}
        className='object-cover w-56 h-full rounded-l-sm' />
      </div>
    <div className='p-4 mt-4 mb-4 w-96'>
      <div className='mt-4 mb-4 text-center'>
        <h1 className='text-3xl font-bold text-center text-indigo-500'>Stockify</h1>
        <p className='m-1 text-xs text-gray-600'>"Trade. Thrive. Triumph."</p>
        <p className='mt-4 mb-2 text-xl font-bold text-gray-700'>Sign up for an account.</p>
        <p className='mb-2 text-xs font-semibold text-gray-600'>Already have an account? <Link to={'/login'} className='font-bold text-indigo-900'>Sign in.</Link></p>
      </div>
      
      <div className='flex flex-row'>
        <div className='w-full m-2'>
          <label htmlFor="firstname" className='text-xs font-semibold text-gray-700'>Firstname</label>
          <input 
            type="text" 
            name="firstname" 
            id="firstname" 
            value={formData.firstname}
            onChange={handleChange}
            className='w-full p-1 border border-black rounded-sm border-opacity-30 outline-indigo-900'/>
          </div>
          <div className='w-full m-2'>
          <label htmlFor="lastname" className='text-xs font-semibold text-gray-700'>Lastname</label>
          <input 
            type="text" 
            name="lastname" 
            id="lastname" 
            value={formData.lastname}
            onChange={handleChange}
            className='w-full p-1 border border-black rounded-sm border-opacity-30 outline-indigo-900'/>
          </div>
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
      <div className='m-2'>
        <label htmlFor="password_confirmation" className='text-xs font-semibold text-gray-700'>Confirm Password</label>
        <input 
            type="password" 
            name="password_confirmation" 
            id="password_confirmation" 
            value={formData.password_confirmation}
            onChange={handleChange}
            className='w-full p-1 border border-black rounded-sm border-opacity-30 outline-indigo-900'/>
      </div>
      <div className='mx-2 mt-4 mb-4'>
        <button type='submit' className='w-full p-2 text-white bg-indigo-900 rounded-sm shadow-lg'>Sign Up</button>
      </div>
      <div className='m-2 text-xs text-center text-gray-600'>
        <p>By signing up you agree with our privacy terms and conditions.</p>
      </div>
      </div>
    </form>
  )
}

export default RegisterForm