import React from 'react'
import WrappedHeader from '../../utils/WrappeHeader'
import ApprovalList from '../../components/cards/ApprovalList'

const Approvals = () => {
  return (
    <section className='h-[90vh] py-4 flex justify-center w-full flex-row justify-between'>
      <div className='w-full px-4'>
        <ApprovalList />
      </div>
      
    </section>
  )
}

export default WrappedHeader(Approvals, 'Approvals')