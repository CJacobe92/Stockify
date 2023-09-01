import React from 'react'

const fetchStockData = async(auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/stocks`

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }

    const data = await response.json();

    return data

  } catch(error) {
    console.error(error)
  }
}

export default fetchStockData