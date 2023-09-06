import React, { useContext, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import useFormatDate from '../../hooks/useFormatDate'

const UserList = ({input}) => {
  const { allUsersData } = useContext(DataContext)

  const {formatDate} = useFormatDate()
  
  const itemsPerPage = 10
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages =  Math.ceil(allUsersData?.data?.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const userData = allUsersData && allUsersData?.data?.slice(startIndex, endIndex)

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
  

  return (
      <div className='w-full'>
        <table className='w-full text-sm'>
          <thead className='w-full mb-2 text-indigo-700 bg-white border-b-8 border-gray-900'>
            <tr className='px-1'>
              <th className='p-1 text-center'>Id</th>
              <th className='p-1 text-center'>Firstname</th>
              <th className='p-1 text-center'>Lastname</th>
              <th className='p-1 text-center'>Email</th>
              <th className='p-1 text-center'>Activated?</th>
              <th className='p-1 text-center'>OTP Enabled?</th>
              <th className='p-1 text-center'>Created</th>
              <th className='p-1 text-center'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userData?.filter((user) => {
              const query = input?.email;
              return(user?.email.includes(query))
            }).map((user, index) =>(
              <tr key={index} className={`${index % 2 == 0 ?'bg-white text-indigo-700':  'bg-indigo-200 text-indigo-700'} border border-indigo-700`}>
                <td className='font-bold text-center'>{user.id}</td>
                <td className='text-center'>{user.firstname}</td>
                <td className='text-center'>{user.lastname}</td>
                <td className='font-semibold text-center'>{user.email}</td>
                <td className='text-center'>{user.activated == true ? 'Activated' : 'Inactivated'}</td>
                <td className='text-center'>{user.otp_enabled == true ? 'Enabled': 'Disabled'}</td>
                <td className='text-center'>{formatDate(user.created_at)}</td>
                <td className='flex flex-col w-full text-xs text-center'>
                  <button className='my-1 mb-1 font-semibold hover:underline'>Reset Password</button>
                  <button className='my-1 mt-1 font-semibold hover:underline'>Re-require MFA</button>
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

export default UserList