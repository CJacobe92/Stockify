import React, { useContext } from 'react'
import { API } from './api'
import { useQuery } from '@tanstack/react-query'
import { DataContext } from '../providers/DataContextProvider'
import { storage } from './utils'

const fetchUserData = () =>{

  const isAdmin = JSON.parse(localStorage.getItem('root'))?.isAdmin
  const isEnabled = isAdmin === false ? true : false

  return useQuery(['userData'], async() => {
    try {

      const uid = storage.uid();
      
      if(uid){
        const res = await API.get(`/users/${uid}`)

        if(res.status <= 300 && res.status >= 200){
           return res.data
        }
      }

    } catch(err) {
      throw err.response.data.error
    }
  },
  {
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      return error
    },
    enabled: isEnabled
  })
}

export default fetchUserData