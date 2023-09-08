import React from 'react'
import { API } from './fetchUtils'
import { useMutation, useQuery } from '@tanstack/react-query'

const fetchAllUsersData = () => {

  const isAdmin = JSON.parse(localStorage.getItem('root'))?.isAdmin
  const isEnabled = isAdmin === true ? true : false

  return useQuery(['allUsersData', isAdmin], async() => {
    try {

      const res = await API.get(`/users`)

      if(res.status === 200){
        return res.data
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