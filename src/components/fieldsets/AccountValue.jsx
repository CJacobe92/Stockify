import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import PageLoading from '../spinners/PageLoading'

const AccountValue = () => {

  const { userData,  userIsLoading, userIsFetching } = useContext(DataContext)
  const [totalValue, setTotalValue] = useState()
  const user = userData?.data
  const accounts = user?.accounts.reduce((account) => account)
  const portfolios =  accounts?.portfolios
  const accountBalance = accounts?.balance

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

      <fieldset className='px-2 mb-4 bg-white border-2 border-indigo-700 rounded-sm'>
        <legend className='text-sm font-semibold text-indigo-700'>Account Value</legend>
          <div className='flex flex-col'>
            <div className='flex items-end justify-end w-full h-4'>
              {userIsLoading || userIsFetching ? <PageLoading /> : null}
            </div>
            <p className='mb-4 text-4xl font-bold text-indigo-900'>&#8369;{totalValue ? totalValue.toFixed(2) : null}</p> 
          </div>
          
      </fieldset>          
  )
}

export default AccountValue