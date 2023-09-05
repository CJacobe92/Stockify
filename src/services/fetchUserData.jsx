import React from 'react'
import { API } from './fetchUtils'
import { useQuery } from '@tanstack/react-query'

const fetchUserData = () =>{
  return useQuery(['userData'], async() => {
    try {

      const uid = JSON.parse(localStorage.getItem('root'))?.uid
  
        const res = await API.get(`/users/${uid}`)
  
        return res.data
        
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
    select: (data) => {
      const user = data?.data
      const accounts = user?.accounts.reduce((account) => account)
      const portfolios =  accounts?.portfolios
      const transactions = accounts?.transactions

      return({
        user,
        accounts,
        portfolios,
        transactions
      })
    }
  })
}

export default fetchUserData