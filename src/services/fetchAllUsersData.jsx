import React from 'react'
import { API } from './fetchUtils'
import { useMutation, useQuery } from '@tanstack/react-query'

const fetchAllUsersData = (isAdmin) => {

  return useQuery(['allUsersData', isAdmin], async() => {
    try {

        if(isAdmin){
          const res = await API.get(`/users`)

          if(res.status === 200){
            return res.data
          }
        }

      return []
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
    enabled: isAdmin
  })
}

export default fetchAllUsersData