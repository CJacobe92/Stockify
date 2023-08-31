import React from 'react'

const Credentials = () => {
  return (
    <div className='p-2 m-2 bg-white w-96'>
      <fieldset className='p-2 text-indigo-700 border border-indigo-700'>
        <legend>Credentials</legend>
        <div className='my-2 text-sm'>
          <label>New Password</label>
          <input type="password" name="" id="" className='w-full p-1 border border-indigo-700 outline-none'/>
        </div>
        <div className='my-2 text-sm'>
          <label>Confirm New Password</label>
          <input type="password" name="" id="" className='w-full p-1 border border-indigo-700 outline-none'/>
        </div>
        <div className='mt-4'>
          <button className='w-full p-2 text-sm text-white bg-indigo-900'>Update Password</button>
        </div>
        
      </fieldset>
    </div>
  )
}

export default Credentials