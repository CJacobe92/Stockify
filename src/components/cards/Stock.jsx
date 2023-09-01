import React, { useContext } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import BuyTransaction from '../fieldsets/BuyTransaction'
import StockSearch from '../fieldsets/StockSearch'
import StockDetails from '../fieldsets/StockDetails'

const Stock = () => {

  return (
    <div>
      <p className='pb-2 text-lg font-semibold bg-gray-900'>Stock</p>
      <div className='p-2 bg-white'>
        <StockSearch />
        <StockDetails />
        <BuyTransaction />
      </div>
    </div>
    
  )
}

export default Stock