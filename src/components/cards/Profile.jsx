import React, { useContext, useEffect, useRef, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import useFormatDate from '../../hooks/useFormatDate'
import fetchUpdateUserData from '../../services/fetchUpdateUserData'

const Profile = () => {
  
  const {dataMemo, refetch, currentUser, auth} = useContext(DataContext)
  
  const user = dataMemo && dataMemo
  const firstname = user && user.firstname
  const lastname = user && user.lastname
  const email = user && user.email
  const date = user && user.created_at

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  
  const [editMode, setEditMode] = useState(false)
  const [isDataEdited, setIsDataEdited] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname:  '',
    email: ''
  })

  const { formatDate } = useFormatDate()

  const handleEdit = () => {
    setEditMode(!editMode)
  }

  const handleChange = () => {
    const firstname = firstnameRef.current.value
    const lastname = lastnameRef.current.value
    const email = emailRef.current.value

    setFormData({...formData, firstname: firstname, lastname: lastname, email: email})
    setIsDataEdited(true)
  }
  
  const handleSave = async() => {
    setEditMode(!editMode)

    if(isDataEdited){
      try{
        if(currentUser && auth){
          await fetchUpdateUserData(currentUser, auth, formData)
          refetch();
        }
      }catch(error){
        console.log(error)
      } finally {
        setIsDataEdited(!isDataEdited)
      }
    }else{
      const firstname = firstnameRef.current.value
      const lastname = lastnameRef.current.value
      const email = emailRef.current.value
  
      setFormData({...formData, firstname: firstname, lastname: lastname, email: email})
    }
  }

  return (
    <div className='p-2 m-2 bg-white w-96'>
      <fieldset className='p-2 text-indigo-700 border border-indigo-700'>
        <legend className='font-semibold'>Profile</legend>
          <div className='text-sm'>
            <div className='flex flex-row p-1'>
              <p className='w-20 font-semibold'>Firstname: </p>
              {!editMode ? 
                <p className='p-1 ml-2'>{firstname}</p> :
                <input onChange={handleChange} type="text" name="firstname" ref={firstnameRef} defaultValue={firstname && firstname} className='p-1 ml-2 bg-indigo-100'/> 
              }
              
            </div>
            <div className='flex flex-row p-1'>
              <p className='w-20 font-semibold'>Lastname: </p>
              {!editMode ?
                <p className='p-1 ml-2'>{lastname}</p> :
                <input onChange={handleChange} type="text" name="lastname" ref={lastnameRef} defaultValue={lastname && lastname} className='p-1 ml-2 bg-indigo-100'/> 
              }
            </div>
            <div className='flex flex-row p-1'>
              <p className='w-20 font-semibold'>Email: </p>
              {!editMode ?
                <p className='p-1 ml-2'>{email}</p> :
                <input onChange={handleChange} type="text" name="email" ref={emailRef} defaultValue={email && email} className='p-1 ml-2 bg-indigo-100'/> 
              }
            </div>
            <div className='flex flex-row p-1'>
              <p className='w-20 font-semibold '>Member: </p>
              <p className='p-1 ml-2'>{date && formatDate(date)}</p>
            </div>
          </div>
          <div className='w-full mt-2 text-sm text-right'>
            {!editMode ? 
              <button onClick={handleEdit} className='w-16 px-2 py-1 text-white bg-indigo-900'>Edit</button> :
              <button onClick={handleSave} className='w-16 px-2 py-1 text-white bg-indigo-700'>Save</button>
            }
            
          </div>
      </fieldset>
    </div>
  )
}

export default Profile