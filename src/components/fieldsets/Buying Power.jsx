import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import PageLoading from '../spinners/PageLoading'

const BuyingPower = () => {

  const { userData, userIsLoading, userIsFetching } = useContext(DataContext)
  const [buyingPower, setBuyingPower] = useState()
  
  const user = userData?.data
  const accounts = user?.accounts.reduce((account) => account)
  const accountBalance = accounts?.balance

  useEffect(() => {
    if(accounts){
      setBuyingPower(parseFloat(accountBalance))
    } 
    
  }, [accounts])

  return (
      <fieldset className='px-2 bg-white border-2 border-indigo-700 rounded-sm'>
        <legend className='ml-2 text-xs font-semibold text-indigo-700'>Buying Power</legend>
            <div className='flex items-end justify-end w-full h-4'>
              {userIsLoading || userIsFetching ? <PageLoading /> : null}
            </div>
          <p className='mb-4 text-4xl font-semibold text-indigo-900'>&#8369;{buyingPower ? buyingPower.toFixed(2) : null}</p>
      </fieldset>          
    )

}

export default BuyingPower