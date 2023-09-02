import { createContext, useEffect, useMemo, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";


const initialState = {
  data: null,
  isLoading: false,
  stock: null,
  stockData: null,
  error: null,
}

const reducer = (state, action) => {
  switch(action.type) {
    case 'FETCH_START':
      return {...state, isLoading: true, error: null}
    case 'FETCH_SUCCESS':
      return {...state, isLoading: false, data: action.data, stockData: action.stockData, error: null}
    case 'FETCH_ERROR':
      return {...state, isLoading: false, error: action.error}
    case 'REFETCH_SUCCESS':
      return {...state, data: action.data}
    case 'REFETCH_START':
      return {...state, isLoading: true, error: null}

    case 'SET_STOCK':
      return {...state, stock: action.stock}
    default:
      return state
  }
}

export const DataContext = createContext(null)

export const DataContextProvider = ({children}) => {


  const [ state, dispatch ] = useReducer(reducer, initialState)
  
  const dataMemo = useMemo(() => state.data, [state.data])
  const stockMemo = useMemo(() => state.stockData, [state.stockData])

  const { currentUser, token } = useAuth()

  // Function to trigger a data refetch
  const refetch = async () => {
    try {
      dispatch({ type: 'FETCH_START' });
      const userData = await fetchUserData(currentUser, token);
      const stockData = await fetchStockData(token);
      dispatch({ type: 'FETCH_SUCCESS', data: userData.data, stockData: stockData.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', error: error.message });
    }
  };

  useEffect(() => {
    const fetchData = async() => {
      try{
        console.log('Refetch called')
        if(currentUser, token){
          const data = await fetchUserData(currentUser, token)
          const stockData = await fetchStockData(token)
          if(data && stockData){
            console.log('Refetch successful')

            dispatch({type: 'FETCH_SUCCESS', data: data.data, stockData: stockData.data})
          }
        }
      } catch (error){
        console.error(error)
      } finally {
        
      }
    }

    fetchData();
  }, [currentUser , token, dispatch])

  return(
    <DataContext.Provider value={{state, dispatch, refetch, dataMemo, stockMemo}}>
      {children}
    </DataContext.Provider>
  )
} 