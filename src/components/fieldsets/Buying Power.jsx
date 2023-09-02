import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import PageLoading from '../spinners/PageLoading'

const BuyingPower = () => {

  const { state, dataMemo} = useContext(DataContext)
  const isLoading = state && state.isLoading
  const [buyingPower, setBuyingPower] = useState()
  const accounts = dataMemo && dataMemo.accounts
  const account = accounts && accounts.reduce((account) => (account))
  const accountBalance = account && account.balance

  useEffect(() => {
    if(accounts){
      setBuyingPower(parseFloat(accountBalance))
    } 
    
  }, [accounts])

  return (
      <fieldset className='px-2 py-4 bg-white border-2 border-indigo-700 rounded-sm'>
        <legend className='ml-2 text-xs font-semibold text-indigo-700'>Buying Power</legend>
        {isLoading ? <div className='flex items-center justify-center'><PageLoading /></div> :
          <p className='text-4xl font-semibold text-indigo-900'>$ {buyingPower ? buyingPower.toFixed(2) : null}</p>
        }
       
      </fieldset>          
    )

}

export default BuyingPower