import { createContext, useEffect, useMemo, useReducer } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";
import fetchAllUsersData from "../services/fetchAllUsersData";

export const DataContext = createContext(null)

const root = JSON.parse(localStorage.getItem('root'))
const isAdmin = JSON.parse(localStorage.getItem('isAdmin'))
const isUser = JSON.parse(localStorage.getItem('isUser'))


const initialState = {
  uid: root?.uid || null,
  auth:  root?.auth || null,
  user_type: root?.user_type || '',
  isAdmin: isAdmin || false,
  isUser: isUser || false,
  isAuthenticated: false,
  userData: null,

}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_ROOT':
      return{
        ...state, 
        uid: action.uid, 
        auth: action.auth, 
        user_type: action.user_type,
        isAuthenticated: action.isAuthenticated
      }
    case 'IS_ADMIN':
      return{
        ...state, 
        isAdmin: action.isAdmin
      }
    case 'IS_USER':
      return{
        ...state, 
        isUser: action.isUser
      }
    case 'LOGOUT':
      return initialState

    default:
      return state
  }
}

export const DataContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const isAdmin = state.isAdmin
  const isUser = state.isUser

  const {data: userData, isLoading: userIsLoading} = fetchUserData(isUser);
  const {data: stockData, isLoading: stockIsLoading } = fetchStockData(isUser);
  const {data: allUsersData, isLoading: allUsersIsLoading} = fetchAllUsersData(isAdmin);
 

  useEffect(() => {
    const payload={
      uid: state.uid,
      auth: state.auth,
      user_type: state.user_type
    }
    localStorage.setItem('root', JSON.stringify(payload))

  }, [state.uid, state.auth, state.user_type])

  useEffect(() => {
    if(isAdmin){
      localStorage.setItem('isAdmin', JSON.stringify(isAdmin))
    }else if(isUser){
      localStorage.setItem('isUser', JSON.stringify(isUser))
    }
  }, [state.isAdmin, state.isUser])

  return(
    <DataContext.Provider value={{
      userData,
      userIsLoading,
      stockData,
      stockIsLoading,
      allUsersData,
      allUsersIsLoading,
      state,
      dispatch
      }}>
      {children}
    </DataContext.Provider>
  )
} 