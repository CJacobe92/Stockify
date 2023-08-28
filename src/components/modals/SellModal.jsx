import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const SellModal = ({children, open, onClose, title}) => {
  
  if(!open) return null

  return ReactDOM.createPortal(
    <>
      <div className='fixed inset-0 z-50 bg-black bg-opacity-30'/>
      <div className='fixed top-1/2 left-1/2 transfrom translate-x-[-50%] translate-y-[-50%] bg-white p-4 rounded-lg z-50 h-auto w-96'>
        <div>
          <p className='p-2 text-sm font-semibold text-gray-700'>{title}</p>
        </div>
        { children }
      </div>
    </>,
    document.getElementById('portal')
  )
}

export default SellModal