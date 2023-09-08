import React, { useEffect, useState } from 'react'
import fetchAdminUpdateUserData from '../../services/fetchAdminUpdateUserData'
import ComponentLoading from '../spinners/ComponentLoading'

const PWReset = ({user}) => {
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: ''
  })

  const [matched, setMatched] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [message, setMessage] = useState(null)
  const [showError,setShowError] = useState(null)

  const {mutate, isLoading, isFetching} = fetchAdminUpdateUserData();

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    setIsTyping(true)
  }

  const handleChangePassword = (e) => {
    e.preventDefault();
    const { id } = e.target
    
    mutate({formData, id}, {
      onSuccess: () => {
        setShowError(false)
        setMessage('Password reset successsful')
      }
    })
    
    
  }
  
  useEffect(() => {
    if(formData.password !== formData.password_confirmation){
      setMatched(false)
      setShowError(true)
      setMessage('Passwords do not match')
    }
    
    if(formData.password === formData.password_confirmation){
      setMessage(null)
      setShowError(false)
      setMatched(false)
     
    }

  }, [formData])
  
  const renderMessage = () => {
    switch(showError){
      case true:
        return <p className='text-xs text-red-700'>{message}</p>
      case false: 
        return <p className='text-xs text-green-700'>{message} </p>
    }
  }
  
  return (
    <form id={user.id} onSubmit={handleChangePassword}>
      <fieldset className='p-2 border border-indigo-700 rounded-md'>
        <legend className='font-semibold text-indigo-700 text-start'>Details</legend>
        <div className='flex flex-row items-center'>
          <p className='w-16 font-semibold text-start'>Firstname:</p>
          <p className='font-normal'>{user.firstname}</p>
        </div>
        <div className='flex flex-row items-center'>
          <p className='w-16 font-semibold text-start'>Lastname:</p>
          <p className='font-normal'>{user.lastname}</p>
        </div>
        <div className='flex flex-row items-center'>
          <p className='w-16 font-semibold text-start'>Email:</p>
          <p className='font-normal'>{user.email}</p>
        </div>
        <div className='w-full mt-2 mb-1'>
          <p className='text-sm text-start'>Change Password</p>
          <div className='flex justify-end w-full h-2'>
            {isLoading || isFetching ? <ComponentLoading />: renderMessage()}
          </div>
          <div className='flex flex-col mt-1'>
            <label className='text-start'>Password</label>
            <input 
              onChange={handleChange}
              type="password" 
              name="password" 
              className='w-full p-1 border border-indigo-700 rounded-sm outline-none'/>
          </div>
          <div className='flex flex-col mt-2'>
            <label className='text-start'>Confirm Password</label>
            <input 
              onChange={handleChange}
              type="password" 
              name="password_confirmation" 
              className='w-full p-1 border border-indigo-700 rounded-sm outline-none'/>
          </div>
     
          <button type='submit' className='w-full p-2 mt-2 text-white bg-indigo-700 rounded-sm'>Change Password</button>
          
        </div>
      </fieldset>
    </form>
  )
}

export default PWReset