import React from 'react'
import WrappedHeader from '../../utils/WrappeHeader'
import TransactionsList from '../../components/cards/TransactionsList'

const Transactions = () => {
  return (
    <div className='h-[90vh] py-4 flex w-full flex-col'>

      <div className='w-full px-4'>
        <TransactionsList />
      </div>
     
    </div>
  )
}

export default WrappedHeader(Transactions, 'Transactions')