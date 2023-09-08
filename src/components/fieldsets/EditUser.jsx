import React, { useEffect, useRef, useState } from 'react'
import fetchAdminUpdateUserData from '../../services/fetchAdminUpdateUserData'
import ComponentLoading from '../spinners/ComponentLoading'

const EditUser = ({user}) => {
  const [formData, setFormData] = useState({
    password: '',
    password_confirmation: ''
  })

  const [updateDetails, setUpdateDetails] = useState({
    firstname: '',
    lastname: '',
    email: ''
  })

  const [matched, setMatched] = useState(null)
  const [isTyping, setIsTyping] = useState(false)
  const [message, setMessage] = useState(null)
  const [showError,setShowError] = useState(null)
  const [editMode, setEditMode] = useState(false)
  const [isDataEdited, setIsDataEdited] = useState(false)

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  
  const {mutate, isLoading, isFetching} = fetchAdminUpdateUserData();

  const handleEdit = () => {
    setEditMode(true)
  }

  const handleChange = (e) => {
    const {name, value} = e.target
    setFormData({...formData, [name]: value})
    setIsTyping(true)
  }

  const handleUpdateChange = () => {
    const firstname = firstnameRef.current.value
    const lastname = lastnameRef.current.value
    const email = emailRef.current.value

    setUpdateDetails({...updateDetails, firstname: firstname, lastname: lastname, email: email})
    setIsDataEdited(true)
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

  const handleSave = (e) => {
    e.preventDefault();
    const { id } = e.target

    if(isDataEdited == true){

      const formData = {
        firstname: updateDetails.firstname,
        lastname: updateDetails.lastname,
        email: updateDetails.email
      }
      
      mutate({formData, id}, {
        onSuccess: () => {
          setShowError(false)
          setEditMode(false)
        }
      })
    }else{
      const firstname = firstnameRef.current.value
      const lastname = lastnameRef.current.value
      const email = emailRef.current.value

      setUpdateDetails({...updateDetails, firstname: firstname, lastname: lastname, email: email})
      setEditMode(false)
    }
    

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
    <div  onSubmit={handleChangePassword}>
      <fieldset className='p-2 border border-indigo-700 rounded-md'>
        <legend className='font-semibold text-indigo-700 text-start'>Details</legend>
        <div className='flex items-center justify-end w-full'>
          <button onClick={handleEdit} className='p-1 mx-2'>Edit</button>
          <hr className='h-4 border border-indigo-700'/>
          <button onClick={handleSave} className='p-1 mx-2' id={user?.id}>Save</button>
        </div>
        <div className='flex flex-col justify-start w-full'>
          <div className='flex flex-row items-center'>
            <p className='w-24 text-start'>Firstname:</p>
            {
              !editMode ? <p className='w-full p-1 my-1 text-sm font-normal text-start'>{user.firstname}</p> :
              <input onChange={handleUpdateChange} type="text" name="firsname" ref={firstnameRef} defaultValue={user?.firstname} className='w-full p-1 my-1 text-sm bg-indigo-100'/>
            }
          </div>
          
          <div className='flex flex-row items-center'>
            <p className='w-24 text-start'>Lastname:</p>
            {!editMode ? 
              <p className='w-full p-1 my-1 text-sm font-normal text-start'>{user.lastname}</p> :
              <input onChange={handleUpdateChange} type="text" name="lastname" ref={lastnameRef} defaultValue={user?.lastname} className='w-full p-1 my-1 text-sm bg-indigo-100'/>
            }
          </div>
      
          <div className='flex flex-row items-center'>
            <p className='w-24 text-start'>Email:</p>
            {!editMode ? 
              <p className='w-full p-1 my-1 text-sm font-normal text-start'>{user.email}</p> :
              <input onChange={handleUpdateChange} type="email" name="email" ref={emailRef} defaultValue={user?.email} className='w-full p-1 my-1 text-sm bg-indigo-100'/>
            }
          </div>
          
        </div>
        <div className='w-full mt-4 mb-1'>
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
     
          <button onClick={handleChangePassword} className='w-full p-2 mt-2 text-white bg-indigo-700 rounded-sm' id={user.id}>Change Password</button>
          
        </div>
      </fieldset>
    </div>
  )
}

export default EditUser