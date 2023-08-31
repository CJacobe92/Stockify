import React from 'react'

const fetchUpdateUserData = async(uid, auth, payload) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/users/${uid}`

    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({'user': payload})
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }

  } catch(error) {
    console.error(error)
  }
}

export default fetchUpdateUserData