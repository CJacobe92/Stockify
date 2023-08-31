import React from 'react'
import topup from '../../assets/topup.jpg'

const TopUp = () => {
  return (
    <div className='p-2 m-2 bg-white w-96'>
      <fieldset className='p-2 text-indigo-700 border border-indigo-700'>
        <legend>Top Up</legend>
        <img src={topup}
        className='object-cover h-48 h-full rounded-r-sm w-96'/>
        <div className='mx-2 mt-4 mb-4 text-sm'>
          <p className='font-semibold'>Add funds to your wallet.</p>
        </div>
        
        <div className='flex flex-col m-2'>
          <label className='mb-2 text-xs font-semibold'>Amount</label>
          <input type="text" name="amount" className='p-2 bg-indigo-100 border border-indigo-700 outline-none'/>
        </div>

        <div className='mx-2 mt-4'>
          <button className='w-full p-2 text-white bg-indigo-900'>Top Up</button>
        </div>
        <div className='mx-2 mt-4'>
          <p className='text-xs'>
            Note: Please allow 5 minutes for the amount to reflect on your wallet.
          </p>
        </div>  
       
      </fieldset>
    </div>
  )
}

export default TopUp