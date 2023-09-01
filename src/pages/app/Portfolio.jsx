import React, { useContext, useEffect, useState } from 'react'
import Overview from '../../components/cards/Overview'
import StockSearch from '../../components/fieldsets/StockSearch'
import Holdings from '../../components/cards/Holdings'
import BuyTransaction from '../../components/fieldsets/BuyTransaction'
import PerformanceChart from '../../components/cards/PerformanceChart'
import Stock from '../../components/cards/Stock'
import { DataContext } from '../../providers/DataContextProvider'

const Portfolio = () => {

  return (
    <div className='grid w-full h-[90vh] grid-cols-6 gap-4 p-10'>
        <div className='w-full col-span-2 row-span-2'>
          <Stock />
        </div>
        <div className='w-full col-span-3 row-span-2'>
        <Holdings />
          
        </div>
        <div className='col-span-1 row-span-2'>
          <Overview/>
          <PerformanceChart />
        </div>
    </div>
      
  )
}

export default Portfolio