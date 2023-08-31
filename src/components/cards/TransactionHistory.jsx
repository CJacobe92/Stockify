import React, { useContext } from 'react';
import { GlobalContext } from '../../providers/GlobalContextProvider';
import useFormatDate from '../../hooks/useFormatDate';

const TransactionHistory = ({input, query}) => {
  const { state } = useContext(GlobalContext);
  const transactions = state.transactions && state.transactions;
  const {formatDate} = useFormatDate()

  return (
    <div className='w-full'>
      <div className='w-full overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-indigo-500 h-[72vh]'>
        <table className='w-full'>
          <thead className='sticky top-0 text-black bg-white'>
            <tr>
              <th className='p-2'>Id</th>
              <th className='p-2'>Type</th>
              <th className='p-2'>Symbol</th>
              <th className='p-2'>Quantity</th>
              <th className='p-2'>Price</th>
              <th className='p-2'>Cash Value</th>
              <th className='p-2'>Time</th>
            </tr>
          </thead>
          <tbody>
            {transactions &&
              transactions.filter((transaction) =>{

                const search = input.query;
                const filter = input.filter
                
                const id = transaction.id.toString()
                const price = transaction.price.toString()
                const total_cash_value = transaction.total_cash_value.toString()
                const date = transaction.date.toString()
                const type = transaction.type.toString()
                const symbol = transaction.symbol.toString()
                const quantity = transaction.quantity.toString()

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

                // Normal Query
                if(search){
                  let searchResult;
                  
                  switch(filter){
                    case 'id':
                      searchResult = id.includes(search);
                      break;
                    case 'type':
                      searchResult = type.includes(search);
                      break;
                    case 'quantity':
                      searchResult = quantity.includes(search);
                      break;
                    case 'price':
                      searchResult = price.includes(search);
                      break;
                    case 'symbol':
                      searchResult = symbol.includes(search) ;
                      break;
                    case 'total_cash_value':
                      searchResult = total_cash_value.includes(search);
                      break;
                    case 'date':
                      searchResult = date.includes(search);
                      break;
                      
                    default:
                      searchResult = transaction
                      break;
                  }

                  return searchResult
                  
                }   
                
                // Advance Query
                if( idQuery || typeQuery || symbolQuery){

                  const idContainsQuery = idQueryParam === 'contains' ? id.includes(idQueryValue) : true
                  const typeContainsQuery = typeQueryParam === 'contains' ? type.includes(typeQueryValue) : true
                  const symbolContainsQuery = symbolQueryParam === 'contains' ? symbol.includes(symbolQueryValue) : true

                  const idStartsWithQuery = idQueryParam === 'startsWith' ? id.startsWith(idQueryValue) : true
                  const typeStartsWithQuery = typeQueryParam === 'startsWith' ? type.startsWith(typeQueryValue) : true
                  const symbolStartsWithQuery = symbolQueryParam === 'startsWith' ? symbol.startsWith(symbolQueryValue) : true

                  const idEndsWithQuery = idQueryParam === 'endsWith' ? id.endsWith(idQueryValue) : true
                  const typeEndsWithQuery = typeQueryParam === 'endsWith' ? type.endsWith(typeQueryValue) : true
                  const symbolEndsWithQuery = symbolQueryParam === 'endsWith' ? symbol.endsWith(symbolQueryValue) : true


                  if(idContainsQuery && 
                    typeContainsQuery && 
                    symbolContainsQuery && 
                    idStartsWithQuery && 
                    typeStartsWithQuery && 
                    symbolStartsWithQuery && 
                    idEndsWithQuery &&
                    typeEndsWithQuery &&
                    symbolEndsWithQuery)
                    {return true
                  }
                }
    
                
              }).map((transaction, index) => (
                  <tr key={index} className='border border-white'>
                    <td className='p-2 text-center'>{transaction != null ? transaction.id : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.type : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.symbol : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.quantity : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.price : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.total_cash_value : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? formatDate(transaction.date) : null}</td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
