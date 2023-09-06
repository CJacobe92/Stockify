import React, { useContext, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import useFormatDate from '../../hooks/useFormatDate'
import fetchAdminUpdateUserData from '../../services/fetchAdminUpdateUserData'

const ApprovalList = () => {
  const { allUsersData } = useContext(DataContext)

  const {formatDate} = useFormatDate()
  
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages =  Math.ceil(allUsersData?.forApproval?.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const userData = allUsersData && allUsersData?.forApproval?.slice(startIndex, endIndex)
  const {mutate} = fetchAdminUpdateUserData();

  const handleNextPage = () => {  
    if (currentPage < totalPages) {

      setCurrentPage(currentPage + 1);
    }
  };

  // Handle previous page button click
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleApprove = (e) => {
    const { id } = e.target
    const formData = {
      activated: true
    }
    mutate({formData, id})
  }

  return (
      <div className='w-full'>
        <table className='w-full text-sm'>
          <thead className='w-full mb-2 text-indigo-700 bg-white border-b-8 border-gray-900'>
            <tr className='px-1'>
              <th className='p-1 text-center'>Id</th>
              <th className='p-1 text-center'>Firstname</th>
              <th className='p-1 text-center'>Lastname</th>
              <th className='p-1 text-center'>Email</th>
              <th className='p-1 text-center'>Status</th>
              <th className='p-1 text-center'>Created</th>
              <th className='p-1 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData?.map((user, index) =>(
              <tr key={index} className={`${index % 2 == 0 ?'bg-white text-indigo-700':  'bg-indigo-200 text-indigo-700'} border border-indigo-700`}>
                <td className='p-2 font-bold text-center'>{user.id}</td>
                <td className='p-2 text-center'>{user.firstname}</td>
                <td className='p-2 text-center'>{user.lastname}</td>
                <td className='p-2 font-semibold text-center'>{user.email}</td>
                <td className='p-2 font-semibold text-center'>{user.activate === 'true' ? 'Activated' : 'Inactive'}</td>
                <td className='p-2 text-center'>{formatDate(user.created_at)}</td>
                <td className='flex flex-col w-full p-2 text-xs text-center'>
                  <button className='my-1 mb-1 font-semibold hover:underline' id={user.id} onClick={handleApprove}>Activate</button>
                </td>
              </tr>
            ))}
          </tbody>
          
        </table>
        <div className='fixed bottom-5 right-5'>
          <div className='flex flex-row'>
            <button onClick={handlePrevPage} className='m-1'>Previous</button>
              <p className='p-2'>{currentPage}</p>
            <button onClick={handleNextPage} className='m-1'>Next</button>
          </div>
        </div>
      </div>
       

    
  )
}

export default ApprovalList