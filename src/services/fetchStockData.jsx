import React from 'react'
import { API } from './fetchUtils'
import { useQuery } from '@tanstack/react-query'

const fetchStockData = () => {
  const user_type = JSON.parse(localStorage.getItem('root'))?.user_type
  const user = user_type === 'User' ? true : false

  return useQuery(['stockData', user], async() => {
    try{
      const res = await API.get('/stocks')

      if(res.status === 200){
        return res.data
      }

    } catch(err) {
      throw err.response.data.error
    }
  }, {
    onSuccess: (data) =>{
      return data
    },
    onError: (error) =>{
      return error
    },
    select: (data) =>{
      const stockData = data.data
      return stockData
    },
    // enabled: user
  })
}

export default fetchStockData