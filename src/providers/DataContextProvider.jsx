import { createContext, useEffect, useMemo, useReducer } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";
import fetchAllUsersData from "../services/fetchAllUsersData";

const root = JSON.parse(localStorage.getItem('root'))

const initialState = {
  auth: root?.auth || null,
  currentUser: root?.currentUser || null,
  userType: root?.userType || null,
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
    case 'SET_AUTH':
      return {...state, isLoading: true, auth: action.auth}
    case 'SET_CURRENTUSER':
      return {...state, isLoading: true, currentUser: action.currentUser}
    case 'SET_TYPE':
      return {...state, isLoading: true, userType: action.userType}

    case 'SET_STOCK':
      return {...state, stock: action.stock}

    case 'RESET_STATE':
      return initialState;

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
  const userType = useMemo(() => state.userType, [state.userType])


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

  const signIn = (uid, auth, userType) => {
    dispatch({type: 'SET_CURRENTUSER', currentUser: uid})
    dispatch({type: 'SET_AUTH', auth: auth})
    dispatch({type: 'SET_TYPE', userType: userType})
    const payload = {
      auth: auth,
      currentUser: uid,
      userType: userType
    }
    localStorage.setItem('root', JSON.stringify(payload))
  }

  const signOut = () => {
    dispatch({type: 'RESET_STATE', currentUser: null})
    localStorage.removeItem('root')
  }

  useEffect(() => {

    if(userType == 'User'){
      const getUserData = async() => {
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
        } 
      }
  
      getUserData();
    } 

    if(userType == 'Admin'){
      const getAllUsersData = async() => {
        if(currentUser, auth){
          const data = await fetchAllUsersData(auth)
          if(data){
            dispatch({type: 'FETCH_SUCCESS', data: data.data, stockData: null})
          }
         
        }
      }
      getAllUsersData();
    }

    
  }, [currentUser , auth, dispatch, signIn])
  
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
      auth,
      userType
      }}>
      {children}
    </DataContext.Provider>
  )
} 