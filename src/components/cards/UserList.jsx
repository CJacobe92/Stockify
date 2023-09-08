import React, { useContext, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider'
import useFormatDate from '../../hooks/useFormatDate'
import SearchModal from '../modals/SearchModal'
import UserSearch from '../fieldsets/UserSearch'
import fetchAdminUpdateUserData from '../../services/fetchAdminUpdateUserData'
import PWResetModal from '../modals/PWResetModal'
import PWReset from '../fieldsets/PWReset'
import ComponentLoading from '../spinners/ComponentLoading'
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import fetchDeleteUser from '../../services/fetchDeleteUser'

const UserList = () => {

  const { allUsersData, allUsersIsLoading, allUsersIsFetching } = useContext(DataContext)

  // hooks
  const {formatDate} = useFormatDate()
  const {mutate, isLoading, isFetching} = fetchAdminUpdateUserData();
  const {mutate: deleteUser, isLoading: deleteUserIsLoading, isFetching: deleteUserIsFetching} = fetchDeleteUser();

  const [input, setInput] = useState({query: ''})
  const [currentPage, setCurrentPage] = useState(1)
  const [isSearching, setIsSearching] = useState(false)

  const itemsPerPage = 10
  const totalPages =  Math.ceil(allUsersData?.users?.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const showPagination = isSearching === false ? true : false
  const paginatedData = allUsersData && allUsersData?.users?.sort((a, b) => (a.id - b.id)).slice(startIndex, endIndex)
  const unPaginatedData = allUsersData && allUsersData?.users?.sort((a, b) => (a.id - b.id))
  const userData = showPagination ? paginatedData :  unPaginatedData  

  const handleSearch = () => {
    setIsSearching(true)
  }

  const handleChange = (e) => {
    setInput({...input, query: e.target.value})
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

  const handleDeactivate = (e) => {
    const { id } = e.target
    const formData = {
      activated: false
    }
    mutate({formData, id})
  }

  const handleRequireMFA = (e) => {
    const { id } = e.target
    const formData = {
      otp_enabled: false
    }
    mutate({formData, id})
  }
  
  const handleDelete = (e) => {
    const { id } = e.target
    deleteUser(id)
  }

  const handleReset = (e) => {
    setInput({...input, query: ''})
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
              <th className='p-1 text-center'>OTP Enabled?</th>
              <th className='p-1 text-center'>Created At</th>
              <th className='p-1 text-center'>Actions</th>
              <th>
                {isLoading
                  || isFetching 
                    || allUsersIsLoading 
                      || allUsersIsFetching  
                        || deleteUserIsLoading 
                          || deleteUserIsFetching ? 
                  <ComponentLoading /> : null
                }
              </th>
            </tr>
          </thead>
          <tbody>
            {userData?.filter((user) => {
              const query = input.query
              const idQuery = user?.id.toString().includes(query)
              const firstnameQuery = user?.firstname.includes(query)
              const lastnameQuery = user?.lastname.includes(query)
              const emailQuery = user?.email.includes(query)
              const createdAtQuery = formatDate(user?.created_at).includes(query)
 
              return(
                idQuery 
                  || firstnameQuery 
                    || lastnameQuery 
                      || emailQuery
                        || createdAtQuery)
            }).map((user, index) =>(
              <tr key={index} className={`${index % 2 == 0 ?'bg-white text-indigo-700': 'bg-indigo-200 text-indigo-700'} border border-indigo-700`}>
                <td className='p-2 font-bold text-center'>{user.id}</td>
                <td className='p-2 text-center'>{user.firstname}</td>
                <td className='p-2 text-center'>{user.lastname}</td>
                <td className='p-2 font-semibold text-center'>{user.email}</td>
                <td className='p-2 font-semibold text-center'>{user.activated === true ? 'Active' : 'Inactive'}</td>
                <td className='flex items-center justify-center p-2 text-center'>{user.otp_enabled == true ? 'Enabled': 'Disabled'}</td>
                <td className='p-2 text-center'>{formatDate(user.created_at)}</td>
                <td className='flex flex-row items-center w-full p-2 text-xs text-center justify-evenly'>
                  <button className='font-semibold hover:underline' id={user.id}>
                    <PWResetModal title={'Reset Password'}>
                      <PWReset user={user}/>
                    </PWResetModal>
                  </button>
                  <button onClick={handleRequireMFA} className='font-semibold hover:underline' id={user.id}>Re-require MFA</button>
                  <button onClick={handleDeactivate} className='font-semibold hover:underline' id={user.id}>Deactivate</button>
                  <button onClick={handleDelete} className='font-semibold hover:underline' id={user.id}>Delete</button>

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
              <button onClick={handleReset} className='flex flex-row items-center justify-center mx-2'>
                <p className='mr-1'>Reset</p>
                <RestartAltIcon style={{fontSize: '1.8rem'}}/>
              </button>
              <button onClick={() => {setIsSearching(false); handleReset}}  className='flex flex-row items-center justify-center mx-2'>
                <p className='mr-1'>Exit</p>
                <ExitToAppIcon style={{fontSize: '1.8rem'}}/>
            </button>
       </div>
          }
          <hr className='h-6 mx-2 border border-white'/>
          <SearchModal title={'Search Email'} setInput={setInput} input={input} handleSearch={handleSearch}>
            <UserSearch handleChange={handleChange}/>
          </SearchModal>
        </div>
      </div>
  )
}

export default UserList