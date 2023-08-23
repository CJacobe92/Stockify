import React, { useState } from 'react'
import RegisterForm from '../components/forms/RegisterForm'
import { fetchRegister } from '../providers/ApiFetch'
import { useNavigate } from 'react-router-dom'

const Register = () => {

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
    try{
      const response = await fetchRegister(formData)

      if (response.ok){
        navigate('/review')
      }else{
        console.error(response.statusText)
      }
    }catch(error){
      console.error(error)
    }
  }

  return(
    <section className='min-h-screen w-full flex items-center justify-center bg-gray-900'>
      <RegisterForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}
      />
    </section>
  )
  
}

export default Register