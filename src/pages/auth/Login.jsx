import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/forms/LoginForm';
import { useFetchLogin} from '../../providers/ApiFetch';
import { GlobalContext } from '../../providers/GlobalContextProvider';
import FetchLoading from '../../components/spinners/FetchLoading';


const Login = () => {
  
  const { dispatch } = useContext(GlobalContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleChange = (e) => {
    const {id, value} = e.target
    setFormData({...formData, [id]: value})
  }

const {mutate, isLoading, isFetching} = useFetchLogin()
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try{
    
      mutate(formData)

    }catch(error){
      
    }
  }

  return (
    <section className='flex items-center justify-center w-full min-h-screen bg-gray-900'>
      {isLoading || isFetching ?
        <FetchLoading />: 
        <LoginForm 
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        formData={formData}/>
      }
      
    </section>
  )
}

export default Login