import React from 'react'
import { API } from './fetchUtils'
import { useQuery } from '@tanstack/react-query'

const fetchStockData = () => {
  return useQuery(['stockData'], async() => {
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
    }
  })
}

export default fetchStockData