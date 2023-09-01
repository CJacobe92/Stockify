import { createContext, useEffect, useReducer } from "react";
import useAuth from "../hooks/useAuth";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";


const initialState = {
  data: null,
  isLoading: false,
  refetch: false,
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
    case 'REFETCH':
      return {...state, isLoading: true, error: null, refetch: true}
    case 'RESET_REFETCH':
      return {...state, isLoading: false, error: null, refetch: false}

    case 'SET_STOCK':
      return {...state, stock: action.stock}
    default:
      return state
  }
}

export const DataContext = createContext(null)

export const DataContextProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  const { currentUser, token } = useAuth()

  useEffect(() => {
    const fetchData = async() => {
      try{
        console.log('fetch data called')
        dispatch({type: 'FETCH_START'})
        if(currentUser, token){
          const data = await fetchUserData(currentUser, token)
          const stockData = await fetchStockData(token)
          if(data && stockData){
            dispatch({type: 'FETCH_SUCCESS', data: data.data, stockData: stockData.data})
            dispatch({type: 'RESET_REFETCH'})
          }
        }
      } catch (error){
        console.error(error)
      } finally {
        
      }
    }

    fetchData();
  }, [token, state.refetch, dispatch])

  return(
    <DataContext.Provider value={{state, dispatch}}>
      {children}
    </DataContext.Provider>
  )
} 