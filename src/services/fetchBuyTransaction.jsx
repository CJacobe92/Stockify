import React from 'react'

const fetchBuyTransaction = async(uid, auth, account_id, stock_id, formData) => {

  try {
    const baseURL = `${import.meta.env.VITE_API_URL}/users/${uid}/accounts/${account_id}/transactions`

    const payload = {
      transaction_type: 'buy',
      quantity: formData.quantity
    }

    const request = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      body: JSON.stringify({
        transaction: payload, 
        stock_id: stock_id
      })
    }

    const response = await fetch(baseURL, request)

    if (!response.ok) {
      console.error('Failed to fetch')
    }

    const result = await response.json()

    return result
  } catch(error) {
    console.error(error)
  }
}

export default fetchBuyTransaction