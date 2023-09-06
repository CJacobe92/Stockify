import React from 'react'

const ApprovalListSearch = ({handleChange}) => {
  return (
    <div className='w-full p-2 bg-white rounded-md shadow-md bg-opacity-80 shadow-indigo-500'>
      <p className='text-xs font-semibold text-indigo-700'>Search Email</p>
      <input onChange={handleChange} type="text" name='input'  className='w-full p-1 text-indigo-700 border-2 border-indigo-500 rounded-sm outline-none '/>
    </div>
  )
}

export default ApprovalListSearch