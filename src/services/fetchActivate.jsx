import React from 'react'

const fetchActivate = async(auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/activate?token=${auth}`

    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
    }

    const response = await fetch(baseURL, request)
    const result = await response.json()


    if (!response.ok) {
      return result
    }
    
    return result

  } catch(error) {
    console.error(error)
  }
}

export default fetchActivate