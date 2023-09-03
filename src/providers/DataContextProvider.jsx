import { createContext, useEffect, useMemo, useReducer } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";

const currentUser = JSON.parse(localStorage.getItem('current_user'))
const auth = JSON.parse(localStorage.getItem('auth'))

const initialState = {
  auth: auth ? auth: null,
  currentUser: currentUser ? currentUser : null,
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
    case 'SET_CURRENTUSER':
      return {...state, isLoading: true, currentUser: action.currentUser}
    case 'SET_AUTH':
      return {...state, isLoading: true, auth: action.auth}

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
  const currentUser = useMemo(() => state.currentUser, [state.currentUser])
  const auth = useMemo(() => state.auth, [state.auth])

  // Function to trigger a data refetch
  const refetch = async () => {
    try {
      dispatch({ type: 'FETCH_START' });
      const userData = await fetchUserData(currentUser, auth);
      const stockData = await fetchStockData(auth);
      dispatch({ type: 'FETCH_SUCCESS', data: userData.data, stockData: stockData.data });
    } catch (error) {
      dispatch({ type: 'FETCH_ERROR', error: error.message });
    }
  };

  const signIn = (uid, auth) => {
    dispatch({type: 'SET_CURRENTUSER', currentUser: uid})
    dispatch({type: 'SET_AUTH', auth: auth})
  }

  const signOut = () => {
    dispatch({type: 'SET_CURRENTUSER', currentUser: null})
    dispatch({type: 'SET_AUTH', auth: null})
    localStorage.removeItem('current_user')
    localStorage.removeItem('auth')
  }

  useEffect(() => {
    const fetchData = async() => {
      try{
        if(currentUser, auth){
          const data = await fetchUserData(currentUser, auth)
          const stockData = await fetchStockData(auth)
          if(data && stockData){
            dispatch({type: 'FETCH_SUCCESS', data: data.data, stockData: stockData.data})
          }
        }
      } catch (error){
        console.error(error)
      } finally {
        
      }
    }

    fetchData();
  }, [currentUser , auth, dispatch])

  useEffect(() => {
    localStorage.setItem('current_user', JSON.stringify(currentUser))
    localStorage.setItem('auth', JSON.stringify(auth))
  }, [signIn, signOut])

  return(
    <DataContext.Provider value={{
      state, 
      dispatch, 
      refetch, 
      dataMemo, 
      stockMemo,
      signIn,
      signOut,
      currentUser,
      auth
      }}>
      {children}
    </DataContext.Provider>
  )
} 