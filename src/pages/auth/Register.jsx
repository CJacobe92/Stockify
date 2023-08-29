import React, { useState } from 'react'

import RegisterForm from '../../components/forms/RegisterForm'
import FetchLoading from '../../components/spinners/FetchLoading'
import fetchRegister from '../../services/fetchRegister'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      
      const response = await fetchRegister(formData)
      
      if (response.error) {
        setError(response.error)
      }else if (response.ok) {
       
        navigate('/review')
      }
      setIsLoading(false)
    } catch (error) {
      setError('An error occurred during registration:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return(
    isLoading ?  <FetchLoading /> :
    <section className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      <RegisterForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </section>
  )
  
}

export default Register