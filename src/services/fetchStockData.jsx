import React from 'react'
import { API } from './api'
import { useQuery } from '@tanstack/react-query'
import { storage } from './utils'

const fetchStockData = () => {

  const isAdmin = storage.isAdmin
  const isEnabled = isAdmin === false ? true : false

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
    },
    enabled: isEnabled
  })
}

export default fetchStockData