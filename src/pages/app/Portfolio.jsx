import React from 'react'
import Overview from '../../components/cards/Overview'
import StockSearch from '../../components/fieldsets/StockSearch'
import Holdings from '../../components/cards/Holdings'
import BuyTransaction from '../../components/fieldsets/BuyTransaction'
import PerformanceChart from '../../components/cards/PerformanceChart'
import Stock from '../../components/cards/Stock'

const Portfolio = () => {
  return (
    <div className='grid w-full h-[90vh] grid-cols-4 gap-6 px-10 py-4'>
        <div className='col-span-1 row-span-3'>
          <Stock/>
        </div>
        <div className='col-span-2 row-span-2'>
          <PerformanceChart />
        </div>
        <div className='col-span-1 row-span-1'>
          <Overview/>
        </div>
        <div className='col-span-3 col-start-2 row-span-1 bg-white h-52'>
          <Holdings />
        </div>
    </div>
      
  )
}

export default Portfolio