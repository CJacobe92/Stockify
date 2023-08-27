import React from 'react'

const fetchActivate = async(auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_DOMAIN_URL}/auth/activate?token=${auth}`

    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      }
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }
    
  } catch(error) {
    console.error(error)
  }
}

export default fetchActivate