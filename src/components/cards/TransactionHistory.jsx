import React, { useContext } from 'react';
import { GlobalContext } from '../../providers/GlobalContextProvider';

const TransactionHistory = ({input, query}) => {
  const { state } = useContext(GlobalContext);
  const transactions = state.transactions && state.transactions;

  return (
    <div className='flex items-center w-full'>
      <div className='w-full overflow-y-auto scrollbar-thin scrollbar-track-slate-100 scrollbar-thumb-indigo-500 h-[72vh]'>
        <table className='w-full h-full'>
          <thead className='relative sticky top-0 text-black bg-white'>
            <tr>
              <th className='p-2'>Id</th>
              <th className='p-2'>Type</th>
              <th className='p-2'>Symbol</th>
              <th className='p-2'>Quantity</th>
              <th className='p-2'>Price</th>
              <th className='p-2'>Cash Value</th>
              <th className='p-2'>Date</th>
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

                const quantityQuery = query && query.quantity
                const quantityQueryParam = query.quantity && query.quantity.parameter
                const quantityQueryValue = query.quantity && query.quantity.value

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

                if(idQuery){
                  let idResult;
                  switch (idQueryParam) {
                    case 'contains':
                      idResult = id.includes(idQueryValue);
                      break;
                    case 'startsWith':
                      idResult = id.startsWith(idQueryValue);
                      break;
                    case 'endsWith':
                      idResult = id.endsWith(idQueryValue);
                      break;
                    case 'equalTo':	
                      idResult = id === idQueryValue;
                      break;
                    
                    default:
                      idResult = transaction;
                      break;
                  }
                  // If idResult is false, the transaction doesn't pass this condition
                  return idResult;
                }

                if (typeQuery) {
                  let typeResult;
                  switch (typeQueryParam) {
                    case 'contains':
                      typeResult = type.includes(typeQueryValue);
                      break;
                    case 'startsWith':
                      typeResult = type.startsWith(typeQueryValue);
                      break;
                    case 'endsWith':
                      typeResult = type.endsWith(typeQueryValue);
                      break;
                    case 'equalTo':
                      typeResult = type === typeQueryValue;
                      break;

                    default:
                      typeResult = transaction
                      break;
                  }
              
                  // If typeResult is false, the transaction doesn't pass this condition
                 return typeResult
                }

                if (symbolQuery) {
                  let symbolResult;
                  switch (symbolQueryParam) {
                    case 'contains':
                      symbolResult = symbol.includes(symbolQueryValue);
                      break;
                    case 'startsWith':
                      symbolResult = symbol.startsWith(symbolQueryValue);
                      break;
                    case 'endsWith':
                      symbolResult = symbol.endsWith(symbolQueryValue);
                      break;
                    case 'equalTo':
                      symbolResult = symbol === symbolQueryValue;
                      break;

                    default:
                      symbolResult = transaction
                      break;
                  }
                
                  // If symbolResult is false, the transaction doesn't pass this condition
                  return symbolResult;
                }
                  
                if(quantityQuery){
                  let quantityResult;
                  
                  switch(quantityQueryParam){
                    case 'equalTo':
                      quantityResult = parseFloat(quantityQueryValue) ===  parseFloat(quantity)   ;
                      break;
                    case 'greaterThan':
                      quantityResult = parseFloat(quantity) > parseFloat(quantityQueryValue)  ;
                      break;
                    case 'lessThan':
                      quantityResult = parseFloat(quantity) < parseFloat(quantityQueryValue)  ;
                      break;

                    default:
                      quantityResult = transaction
                      break;
                  }
                  
                 return quantityResult
                }

                return transaction
                
              }).map((transaction, index) => (
                  <tr key={index}>
                    <td className='p-2 text-center'>{transaction != null ? transaction.id : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.type : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.symbol : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.quantity : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.price : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.total_cash_value : null}</td>
                    <td className='p-2 text-center'>{transaction != null ? transaction.date : null}</td>
                  </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
