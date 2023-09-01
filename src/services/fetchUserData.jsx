import React from 'react'

const fetchUserData = async(uid, auth) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/users/${uid}`

    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
    }

    const response = await fetch(baseURL, request)
    const result = await response.json();

    if (!response.ok) {
      console.error('Failed to fetch')
    }

    return result

  } catch(error) {
    console.error(error)
  }
}

export default fetchUserData