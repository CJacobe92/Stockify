import React, { useState } from 'react'

import RegisterForm from '../../components/forms/RegisterForm'
import { useFetchRegister } from '../../providers/ApiFetch'
import FetchLoading from '../../components/spinners/FetchLoading'

const Register = () => {

  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    password_confirmation: ''
  })

  const { mutate, isLoading, isFetching } = useFetchRegister()

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    try {

      const payload = {
        firstname: formData.firstname,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.password_confirmation
      }
      
      mutate(payload);
      
      if(isLoading || isFetching){
        return <FetchLoading />
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
    }
  }

  return(
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