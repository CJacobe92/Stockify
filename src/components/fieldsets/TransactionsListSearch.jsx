import React from 'react'

const TransactionsListSearch = ({handleChange, input, setInput}) => {
  return (
    <div className='w-full p-2 bg-white rounded-md shadow-md bg-opacity-80 shadow-indigo-500'>
      <p className='text-xs font-semibold text-indigo-700'>Search Account Number</p>
      <div className='flex flex-row items-center justify-between'>
        <input onChange={handleChange} type="text" name='input'  className='w-full p-1 text-indigo-700 border-2 border-indigo-500 rounded-sm outline-none '/>
        <select onChange={(e)=> setInput({...input, queryBy: e.target.value})}className='p-1 ml-2 text-indigo-900 bg-indigo-100 border border-indigo-700 outline-none' defaultValue={input.queryBy}>
            <option value={'account'}>Account</option>
            <option value={'transaction'}>Transaction Id</option>
        </select>
      </div>
      
    </div>
  )
}

export default TransactionsListSearch