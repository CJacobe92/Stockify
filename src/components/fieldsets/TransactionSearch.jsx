import React, { useState } from 'react'

const TransactionSearch = ({handleChange, input, handleValuesChange, values}) => {

  return (
    <div className='w-full p-2 bg-white'>
      <fieldset className='w-full p-2 border-2 border-indigo-700'>
        <legend className='mb-2 font-semibold text-indigo-700'>Transaction Search</legend>
        <div className='grid w-full grid-cols-4 p-2'>
          <div className='col-span-3'>
            <input 
              onChange={handleChange} 
              name='query'
              type="text" 
              className='w-full p-2 mr-1 text-black bg-indigo-100 border-b-4 border-indigo-700 outline-none'
              placeholder='Search By'/>
          </div>
          <div className='col-span-1 ml-1 text-indigo-700'>
            <select onChange={handleChange} name='filter' defaultValue={input.filter} className='w-full px-1 py-2 text-black border border-b-4 border-indigo-700 outline-none'>
              <option value={'symbol'}>Symbol</option>
              <option value={'id'}>Id</option>
              <option value={'type'}>Type</option>
              <option value={'quantity'}>Quantity</option>
              <option value={'price'}>Price</option>
              <option value={'total_cash_value'}>Cash Value</option>
              <option value={'date'}>Date</option>
            </select>
          </div>
        </div>
      </fieldset>
    </div>
  )
}

export default TransactionSearch