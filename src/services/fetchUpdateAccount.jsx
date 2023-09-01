import React from 'react'

const fetchUpdateAccount = async(uid, auth, account_id, payload) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/users/${uid}/accounts/${account_id}`

    const request = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({'account': payload})
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

export default fetchUpdateAccount
