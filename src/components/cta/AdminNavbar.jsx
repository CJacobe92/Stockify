import React from 'react'

const AdminNavbar = ({title}) => {
  return (
    <div className='text-black bg-gray-900 border-b-2 border-indigo-500 h-[10vh] flex justify-between items-center px-4'>
      <h1 className='text-2xl font-bold text-indigo-500'>Stockify</h1>
      <h1 className='text-lg font-bold text-indigo-300'>{title}</h1>
    </div>
  )
}

export default AdminNavbar