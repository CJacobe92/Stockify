import React, { useContext, useMemo, useState } from 'react'
import { DataContext } from '../../providers/DataContextProvider';
import useFormatDate from '../../hooks/useFormatDate';
import TransactionsSearchModal from '../modals/TransactionsSearch';
import TransactionsListSearch from '../fieldsets/TransactionsListSearch';
import ComponentLoading from '../spinners/ComponentLoading';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const TransactionsList = () => {
  const { allUsersData, allUsersIsLoading, allUsersIsFetching } = useContext(DataContext);

  const {formatDate} = useFormatDate()
  

  const [input, setInput] = useState({
    queryBy: 'account',
    query: ''
  })
  const [isSearching, setIsSearching] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const totalPages =  Math.ceil(allUsersData?.transactions?.length / itemsPerPage)

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  
  const showPagination = isSearching === false ? true : false
  const paginatedData = allUsersData && allUsersData?.transactions?.sort((a, b) => (a.id - b.id)).slice(startIndex, endIndex)
  const unPaginatedData = allUsersData && allUsersData?.transactions?.sort((a, b) => (a.id - b.id))
  const Data = showPagination ? paginatedData :  unPaginatedData
  
  const filteredData = Data?.filter((transaction) => { 

    const queryType = input.queryBy
    const query = input.query

    switch(queryType){
      case 'account':
        return(transaction?.account_number.toString().includes(query))
      case 'transaction':
        return(transaction?.id.toString().includes(query))

      default:
        return transaction
    }
    
  })
  
  const memoizedData = useMemo(() => filteredData, [filteredData])
  
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

  return (
    <div className='w-full overflow-y-auto h-[75vh]'>
      <table className='w-full text-sm'>
        <thead className='w-full mb-2 text-indigo-700 bg-white border-b-8 border-gray-900'>
          <tr className='px-1'>
            <th className='p-1 text-center'>Id</th>
            <th className='p-1 text-center'>Symbol</th>
            <th className='p-1 text-center'>Stock Id</th>
            <th className='p-1 text-center'>Type</th>
            <th className='p-1 text-center'>Quantity</th>
            <th className='p-1 text-center'>Price</th>
            <th className='p-1 text-center'>Total Amount</th>
            <th className='p-1 text-center'>Account #</th>
            <th className='p-1 text-center'>Timestamp</th>
            <th>
                {allUsersIsLoading|| allUsersIsFetching ? 
                  <ComponentLoading /> : null
                }
            </th>
          </tr>
        </thead>
        <tbody>
          {memoizedData?.map((transaction, index) =>(
            <tr key={index} className={`${index % 2 == 0 ?'bg-white text-indigo-700':  'bg-indigo-200 text-indigo-700'} border border-indigo-700`}>
              <td className='p-2 font-semibold text-center'>{transaction.id}</td>
              <td className='p-2 font-bold text-center'>{transaction.symbol}</td>
              <td className='p-2 text-center'>{transaction.stock_id}</td>
              <td className='p-2 text-center'>{transaction.transaction_type}</td>
              <td className='p-2 textx-center'>{transaction.quantity}</td>
              <td className='p-2 text-center'>{transaction.price}</td>
              <td className='p-2 text-center'>{transaction.total_cash_value}</td>
              <td className='p-2 text-center'>{transaction.account_number}</td>
              <td className='text-center'>{formatDate(transaction.created_at)}</td>
              <td className='p-2 text-center' />
            </tr>
          ))  
          }
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
              <button onClick={() => setInput({...input, query: ''})} className='flex flex-row items-center justify-center mx-2'>
                <p className='mr-1'>Reset</p>
                <RestartAltIcon style={{fontSize: '1.8rem'}}/>
              </button>
              <button onClick={() => {setIsSearching(false); setInput({...input, query: ''})}} className='flex flex-row items-center justify-center mx-2'>
                <p className='mr-1'>Exit</p>
                <ExitToAppIcon style={{fontSize: '1.8rem'}}/>
              </button>
            </div>
          }
          <hr className='h-6 mx-2 border border-white'/>
          <TransactionsSearchModal title={'Search'} setInput={setInput} input={input} handleSearch={handleSearch}>
            <TransactionsListSearch handleChange={handleChange} input={input} setInput={setInput}/>
          </TransactionsSearchModal>
        </div>
    </div>
  )
}

export default TransactionsList