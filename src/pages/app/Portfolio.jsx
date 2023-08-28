import React from 'react'
import Overview from '../../components/cards/Overview'
import StockSearch from '../../components/search/StockSearch'
import StockDetails from '../../components/cards/StockDetails'
import Holdings from '../../components/cards/Holdings'
import BuyTransaction from '../../components/cards/BuyTransaction'
import PerformanceChart from '../../components/cards/PerformanceChart'

const Portfolio = () => {
  return (
    <div className='flex items-center justify-center h-[90vh] w-full p-20'>
      <div className='grid w-full grid-cols-4 gap-4 '>
          <div className='col-span-1 row-span-1'>
            <Overview />
          </div>
          <div className='w-full col-span-2 col-start-2 row-span-2'>
            <PerformanceChart />
          </div>
         
          <div className='col-start-4 row-span-3'>
          <p className='mb-2 font-semibold'>Stocks</p>
           <StockSearch />
           <StockDetails />
           <BuyTransaction />
          </div>
 
          <div className='w-full col-span-3 col-start-1 row-span-1'>
            <Holdings />
          </div>
      </div>
    </div>
      
  )
}

export default Portfolio