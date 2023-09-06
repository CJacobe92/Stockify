  import React, { useContext, useState } from 'react';
  import { DataContext } from '../../providers/DataContextProvider';
  import useFormatDate from '../../hooks/useFormatDate';
import ComponentLoading from '../spinners/ComponentLoading';

  const TransactionHistory = ({input, query}) => {
    const { userData, userIsLoading,  userIsFetching} = useContext(DataContext);
    const transactionsData = userData && userData?.transactions
    const {formatDate} = useFormatDate()

    const itemsPerPage = 10
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages =  Math.ceil(transactionsData && transactionsData.length / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const showPagination = input.query == '' && query.id.value == '' &&  query.quantity.value == 0 && query.symbol.value == '' &&
    query.type.value == '' ? true : false
  
    const transactions = showPagination ? transactionsData && transactionsData.slice(startIndex, endIndex) : transactionsData
    
      // Handle next page button click
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
        <div className='w-full overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-indigo-500 h-[65vh] rounded-md'>
          <table className='w-full'>
            <thead className='sticky top-0 text-black bg-white border-b border-indigo-700'>
              <tr>
                <th className='p-1 text-sm text-center text-gray-700'>Id</th>
                <th className='p-1 text-sm text-center text-gray-700'>Type</th>
                <th className='p-1 text-sm text-center text-gray-700'>Symbol</th>
                <th className='p-1 text-sm text-center text-gray-700'>Quantity</th>
                <th className='p-1 text-sm text-center text-gray-700'>Price</th>
                <th className='p-1 text-sm text-center text-gray-700'>Cash Value</th>
                <th className='p-1 text-sm text-center text-gray-700'>Time</th>
                <th>
                  {userIsLoading || userIsFetching ? 
                    <ComponentLoading /> : null
                  }
                </th>
              </tr>
            </thead>
            <tbody>
              {transactions &&
                transactions.filter((transaction) =>{
                  
                const search = input.query;
                const filter = input.filter
              
                  if (search) {
                    
                    let searchResult = false;

                    switch(filter){
                      case 'id':
                        searchResult =  transaction.id.toString().includes(search);
                        break;
                      case 'type':
                        searchResult = transaction.transaction_type.includes(search);
                        break;
                      case 'symbol':
                        searchResult = transaction.symbol.includes(search);
                        break;
                      case 'quantity':
                        searchResult = transaction.quantity.toString().includes(search);
                        break;
                      case 'price':
                        searchResult = transaction.price.toString().includes(search);
                        break;
                      case 'total_cash_value':
                        searchResult = transaction.total_cash_value.toString().includes(search);
                        break;
                      case 'date':
                        searchResult = transaction.created_at.includes(search)
                        break;
                      default:
                        searchResult = transaction
                        break;
                    }
                    
                    if(!searchResult){
                      return false
                    }
                    return true
                  }
                  
                  // Queries
                const idQuery = query && query.id
                const idQueryParam = query.id && query.id.parameter
                const idQueryValue = query.id && query.id.value

                const typeQuery = query && query.type
                const typeQueryParam = query.type && query.type.parameter
                const typeQueryValue = query.type && query.type.value
                
                const symbolQuery = query && query.symbol 
                const symbolQueryParam = query.symbol && query.symbol.parameter
                const symbolQueryValue = query.symbol && query.symbol.value     
                
                const quantityQuery = query && query.quantity
                const quantityQueryParam = quantityQuery && quantityQuery.parameter
                const quantityQueryValue = quantityQuery && parseInt(quantityQuery.value)
                    
                
                  if( idQuery || typeQuery || symbolQuery || quantityQuery){

                    const idContainsQuery = idQueryParam === 'contains' ? transaction.id.toString().includes(idQueryValue) : true
                    const typeContainsQuery = typeQueryParam === 'contains' ? transaction.transaction_type.includes(typeQueryValue) : true
                    const symbolContainsQuery = symbolQueryParam === 'contains' ? transaction.symbol.includes(symbolQueryValue) : true

                    const idStartsWithQuery = idQueryParam === 'startsWith' ? transaction.id.toString().startsWith(idQueryValue) : true
                    const typeStartsWithQuery = typeQueryParam === 'startsWith' ? transaction.transaction_type.startsWith(typeQueryValue) : true
                    const symbolStartsWithQuery = symbolQueryParam === 'startsWith' ? transaction.symbol.startsWith(symbolQueryValue) : true

                    const idEndsWithQuery = idQueryParam === 'endsWith' ? transaction.id.toString().endsWith(idQueryValue) : true
                    const typeEndsWithQuery = typeQueryParam === 'endsWith' ? transaction.transaction_type.endsWith(typeQueryValue) : true
                    const symbolEndsWithQuery = symbolQueryParam === 'endsWith' ? transaction.symbol.endsWith(symbolQueryValue) : true

                    const quantityEqualToQuery = quantityQueryParam === 'equalTo' && quantityQueryValue !== 0 ? transaction.quantity === quantityQueryValue : true
                    const quantityGreaterThanQuery = quantityQueryParam === 'greaterThan' && quantityQueryValue !== 0 ? transaction.quantity > quantityQueryValue : true
                    const quantityLessThanQuery = quantityQueryParam === 'lessThan' && quantityQueryValue !== 0 ? transaction.quantity < quantityQueryValue : true

                    return(
                      idContainsQuery &&
                      typeContainsQuery &&
                      symbolContainsQuery &&
                      idStartsWithQuery && 
                      typeStartsWithQuery && 
                      symbolStartsWithQuery &&
                      idEndsWithQuery &&
                      typeEndsWithQuery &&
                      symbolEndsWithQuery &&
                      quantityEqualToQuery &&
                      quantityGreaterThanQuery &&
                      quantityLessThanQuery
                    )  
                  }
                  return transaction
                }).map((transaction, index) => (
                    <tr key={index} className={`${index % 2 == 0  ? 'bg-white text-black' : 'bg-indigo-700'}`}>
                      <td className='p-2 text-center'>{transaction != null ? transaction.id : null}</td>
                      <td className='p-2 text-center'>{transaction != null ? transaction.transaction_type : null}</td>
                      <td className='p-2 text-center'>{transaction != null ? transaction.symbol : null}</td>
                      <td className='p-2 text-center'>{transaction != null ? transaction.quantity : null}</td>
                      <td className='p-2 text-center'>{transaction != null ? transaction.price : null}</td>
                      <td className='p-2 text-center'>{transaction != null ? transaction.total_cash_value : null}</td>
                      <td className='p-2 text-center'>{transaction != null ? formatDate(transaction.created_at) : null}</td>
                      <td className='p-2 text-center' />
                    </tr>
                ))}
            </tbody>
          </table>
  
        </div>
        {showPagination ?
          <div className='flex items-center justify-end w-full mt-4'>
            <div className='flex flex-row text-xs'>
              <button onClick={handlePrevPage} className='mx-2 font-semibold'>Previous</button>
              <p className='px-2 text-base font-bold text-center text-indigo-700 bg-white border-2 border-indigo-700'>{currentPage}</p>
              <button onClick={handleNextPage} className='mx-2 font-semibold'>Next</button>
            </div>
          </div> :
          <div className='flex items-center justify-end w-full p-2 mt-2 text-right bg-gray-900'>
            <p>Search Result</p>
          </div>
        } 
      </div>
    );
  };

  export default TransactionHistory;
