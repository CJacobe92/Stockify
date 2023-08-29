import React from 'react'

const fetchLogout = async(uid, auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/logout/${uid}`


    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      }
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }

    return response
    
  } catch(error) {
    console.error(error)
  }
}

export default fetchLogout