import React from 'react'
import { API } from './api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { storage } from './utils'

const fetchAllUsersData = () => {

  const isAdmin = storage.isAdmin()
  const isEnabled = isAdmin === true ? true : false

  return useQuery(['allUsersData'], async() => {
    try {

      if(isEnabled){
        console.log('All users fetched called')
        const res = await API.get(`/users`)

        if(res.status <= 300 && res.status >= 200){
          return res.data
        }
      }
      
    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onSuccess: (data) => {
     return data
    },
    onError: (error) => {
      return error
    },
    select: (data) => {
      const users = data?.data.filter((data) => (data.activated === true))

      const account = users && users.flatMap((data) => (data?.accounts))
      const transactions = account ? account.flatMap(data => data?.transactions).filter(Boolean) : [];

      const forApproval = data?.data.filter((data) => (data.activated === false))
      return({
        users, 
        forApproval, 
        transactions
      })
    },
    enabled: isEnabled
  })
}

export default fetchAllUsersData