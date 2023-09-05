import React, { useContext } from 'react'
import { API } from './fetchUtils'
import { useQuery } from '@tanstack/react-query'
import { DataContext } from '../providers/DataContextProvider'

const fetchUserData = (user) =>{

  return useQuery(['userData', user], async() => {
    try {
      console.log('Fetch for userdata called')

      const uid = JSON.parse(localStorage.getItem('root'))?.uid
  
      const res = await API.get(`/users/${uid}`)

      if(res.status <= 300 && res.status >= 200){
        return res.data
      }

      return []
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
    },
    enabled: user
  })
}

export default fetchUserData