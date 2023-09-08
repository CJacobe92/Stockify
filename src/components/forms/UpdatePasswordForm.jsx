  import React, { useEffect, useState } from 'react'
import fetchUpdatePassword from '../../services/fetchUpdatePassword';
import { useLocation, useNavigate } from 'react-router-dom';
import ComponentLoading from '../spinners/ComponentLoading';

  const UpdatePasswordForm = () => {
    const [formData, setFormData] = useState({ 
      password: '',
      password_confirmation: '' }
    );
    const [showError, setshowError] = useState(true)
    const [message, setMessage ] = useState('')
    const navigate = useNavigate();

    const location = useLocation();
    const auth = new URLSearchParams(location.search).get('token');
    const {mutate, isLoading, isFetching, error} = fetchUpdatePassword()
  
    
    useEffect(() => {
      // Check if passwords match and update showError message
      if (formData.password !== formData.password_confirmation) {
        setshowError(true);
        setMessage('Passwords do not match');
      } else {
        setshowError(false);
        setMessage('');
      }
    }, [formData.password, formData.password_confirmation]);
    
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault()

      if(formData.password == '' || formData.password_confirmation == ''){
        setshowError(true)
        setMessage('All fields required.')
        return
      }else{
        mutate({formData, auth}, {
          onSuccess: (context) => {
            setMessage(context.message)
            setshowError(false)
              setTimeout(() => {navigate('/login')}, 1500)
          },
          onError: (error) => {
            setshowError(true)
            setMessage(error)
          }
        })
      }
    }

    const renderMessage  = () => {
      switch(showError){
        case true:
          return(<div className='text-red-700'>{message}</div>);
        case false:
          return(<div className='text-green-700'>{message}</div>);
  
        default:
          return null
      }
    }

    return (
      <form className='flex flex-col justify-center p-4 bg-white rounded-md w-96 flex-item-center' onSubmit={handleSubmit}>
        <h1 className='mt-4 text-3xl font-bold text-center text-indigo-900'>Stockify</h1>
        <p className='mt-2 text-2xl font-semibold text-center text-indigo-700'>Update Your Password</p>
          <ol className='px-2 mx-2 mt-2 text-xs leading-6 text-gray-700 list-disc'>
            <li>Minimum of 8 characters</li>   
            <li>Letters (both upper and lower case)</li>
            <li>At least one number</li>
            <li>Optional use of special characters</li>
            <li>Avoid common words or personal information</li>
          </ol>
        <div className='h-4 my-2 text-xs font-semibold'>
        {isLoading || isFetching ? <ComponentLoading /> : renderMessage()}
        </div>
        <div className='w-full'>
          <label className='text-xs font-semibold text-indigo-700'>Password</label>
          <input onChange={handleChange} type="password" id="password" className='w-full p-2 my-1 font-semibold text-indigo-700 border border-indigo-700 rounded-sm outline-none indigo-800'/>
          <label className='text-xs font-semibold text-indigo-700'>Confirm Password</label>
          <input onChange={handleChange} type="password" id="password_confirmation" className='w-full p-2 my-1 font-semibold text-indigo-700 border border-indigo-700 rounded-sm outline-none indigo-800'/>
        </div>
      

        <button type='submit' className='p-2 mt-4 font-semibold text-white bg-indigo-700 rounded-sm'>Update</button>
      </form>
    )
  }

  export default UpdatePasswordForm