import React, { useContext } from 'react';
import { DataContext } from '../../providers/DataContextProvider';
import useFormatDate from '../../hooks/useFormatDate';

const TransactionHistory = ({input, query}) => {
  const { dataMemo } = useContext(DataContext);
  const accounts = dataMemo && dataMemo.accounts
  const account = accounts && accounts.reduce((account) => (account))
  const transactions = account && account.transactions
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
                  <tr key={index} className='border border-white'>
                    <td className='p-2 text-center'>{transaction != null ? transaction.id : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.transaction_type : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.symbol : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.quantity : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.price : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.total_cash_value : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? formatDate(transaction.created_at) : null}</td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
