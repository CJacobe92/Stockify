import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import PageLoading from '../spinners/PageLoading'

const AccountValue = () => {

  const { state, userData } = useContext(DataContext)
  const isLoading = state && state.isLoading
  const [totalValue, setTotalValue] = useState()
  
  const accountBalance = userData && userData?.accounts?.balance
  const portfolios = userData && userData?.portfolios
  
  useEffect(() => {
    let sum = 0
    
    if (portfolios !== undefined) {
        portfolios && portfolios.forEach((portfolio) => {
          sum += parseFloat(portfolio.total_value);
          let balance = parseFloat(accountBalance)
          let total = balance + sum
          setTotalValue(parseFloat(total))
      })
    }else{
      setTotalValue(parseFloat(accountBalance))
    }
  }, [accountBalance, portfolios])
 
  return (

      <fieldset className='px-2 py-4 mb-4 bg-white border-2 border-indigo-700 rounded-sm'>
        <legend className='text-sm font-semibold text-indigo-700'>Total Account Value</legend>
        {isLoading ? <div className='flex items-center justify-center h-18 '><PageLoading /></div> :
          <div className='flex items-center justify-start py-4'>
            <p className='text-4xl font-bold text-indigo-900'>$ {totalValue ? totalValue.toFixed(2) : null}</p> 
          </div>
          }
      </fieldset>          
  )
}

export default AccountValue