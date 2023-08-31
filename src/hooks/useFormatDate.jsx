import React, { useEffect, useState } from 'react'

const useFormatDate = () => {

  // const [formattedDate, setFormattedDate] = useState('')

  
  const formatDate = (value) => {
    const date = new Date(value)
    const format = {
      month: '2-digit',
      day: '2-digit', 
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    }

    const formattedDate = new Intl.DateTimeFormat('en-US', format).format(date);
    
    return formattedDate
  }

  return {formatDate}
}

export default useFormatDate