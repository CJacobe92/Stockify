import React, { useContext, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import useFormatDate from '../../hooks/useFormatDate'
import fetchAdminUpdateUserData from '../../services/fetchAdminUpdateUserData'
import ComponentLoading from '../spinners/ComponentLoading'
import ApprovalModal from '../modals/ApprovalModal'
import ApprovalListSearch from '../fieldsets/ApprovalListSearch'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


const ApprovalList = () => {
  const { allUsersData, allUsersIsLoading, allUsersIsFetching } = useContext(DataContext)

  const {formatDate} = useFormatDate()
  
  const itemsPerPage = 10
  const [input, setInput] = useState({email: ''})
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages =  Math.ceil(allUsersData?.forApproval?.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const showPagination = isSearching === false ? true : false
  const paginatedData = allUsersData && allUsersData?.forApproval?.sort((a, b) => (a.id - b.id)).slice(startIndex, endIndex)
  const unPaginatedData = allUsersData?.forApproval?.sort((a, b) => (a.id - b.id))
  const userData = showPagination ?  paginatedData : unPaginatedData
  

  const {mutate, isLoading, isFetching} = fetchAdminUpdateUserData();

  const handleChange = (e) => {
    setInput({...input, email: e.target.value})
  }
  
  const handleSearch = () => {
    setIsSearching(true)
  }

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
      <div className='w-full overflow-y-auto h-[75vh]'>
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
              <th>
                {isLoading|| isFetching || allUsersIsLoading || allUsersIsFetching? 
                  <ComponentLoading /> : null
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.filter((user) => {
                const query = input?.email;
                return(user?.email.includes(query))
              }).map((user, index) =>(
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
                <td className='p-2 text-center' />
              </tr>
            ))}
          </tbody>
          
        </table>
        <div className='fixed flex flex-row items-center right-10 bottom-5'>
          {showPagination ? 
            <div className='flex flex-row items-center justify-between'>
              <button onClick={handlePrevPage} className='m-1'>Previous</button>
                <p className='px-2 mx-1 font-semibold text-black bg-white border'>{currentPage}</p>
              <button onClick={handleNextPage} className='m-1'>Next</button>
            </div> : 
            <div className='flex flex-row items-center justify-between'>
              <button onClick={() => setInput({...input, email: ''})} className='flex flex-row items-center justify-center mx-2'>
                <p className='mr-1'>Reset</p>
                <RestartAltIcon style={{fontSize: '1.8rem'}}/>
              </button>
              <button onClick={() => {setIsSearching(false); setInput({...input, email: ''})}} className='flex flex-row items-center justify-center mx-2'>
                <p className='mr-1'>Exit</p>
                <ExitToAppIcon style={{fontSize: '1.8rem'}}/>
              </button>
            </div>
          }
          <hr className='h-6 mx-2 border border-white'/>
          <ApprovalModal title={'Search'} setInput={setInput} input={input} handleSearch={handleSearch}>
            <ApprovalListSearch handleChange={handleChange}/>
          </ApprovalModal>
        </div>
      </div>
       

    
  )
}

export default ApprovalList