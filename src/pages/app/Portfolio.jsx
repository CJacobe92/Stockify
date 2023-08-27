import React from 'react'
import Overview from '../../components/cards/Overview'
import StockSearch from '../../components/search/StockSearch'
import StockDetails from '../../components/cards/StockDetails'
import Transaction from '../../components/cards/Transaction'
import Holdings from '../../components/cards/Holdings'

const Portfolio = () => {
  return (
    <div className='h-[90vh] w-full flex flex-row justify-center items-center p-20'>
      <div className='w-full'>
        <Overview />
        <Holdings />
      </div>
      <div className='m-4 bg-white'>
        <StockSearch />
        <StockDetails />
        <Transaction />
       
      </div>
       
    </div>
  )
}

export default Portfolio