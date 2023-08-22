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
    <section className='min-h-screen w-full flex justify-between'>
      <div className='w-[60%] h-screen'>
        <img src={"https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"}
        className='h-screen w-screen object-cover'/>
      </div>
      <div className='w-[40%] h-screen flex items-center justify-center'>
        <RegisterForm 
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          formData={formData}
        />
      </div>
    </section>
  )
  
}

export default Register