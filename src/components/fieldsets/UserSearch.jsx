import React from 'react'

const UserSearch = ({handleChange}) => {
  return (
    <div className='p-2 m-2 bg-white w-96'>
      <fieldset className='p-2 border border-indigo-700'>
        <legend className='text-sm font-semibold text-indigo-700'>Search Email</legend>
        <input onChange={handleChange} type="text" name='input'  className='w-full p-1 text-indigo-700 border-2 border-indigo-500 rounded-sm outline-none '/>
      </fieldset>
    </div>
  )
}

export default UserSearch