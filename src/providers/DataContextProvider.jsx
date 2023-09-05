import { createContext, useEffect, useMemo, useReducer } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";
import fetchAllUsersData from "../services/fetchAllUsersData";

export const DataContext = createContext(null)

const root = JSON.parse(localStorage.getItem('root'))

const initialState = {
  uid: root?.uid || null,
  auth:  root?.auth || null,
  user_type: root?.user_type || '',
  userData: null,
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_ROOT':
      return{
        ...state, 
        uid: action.uid, 
        auth: action.auth, 
        user_type: action.user_type
    }
  }
}

export const DataContextProvider = ({children}) => {

  const [state, dispatch] = useReducer(reducer, initialState)

  const user_type  = state?.user_type
  const user = user_type === "User" ? true : false
  const admin = user_type === "Admin" ? true : false

  const {data: userData } = fetchUserData(user);
  const {data: stockData } = fetchStockData(admin);
  const {data: allUsersData} = fetchAllUsersData();

  useEffect(() => {
    const payload={
      uid: state.uid,
      auth: state.auth,
      user_type: state.user_type
    }

    localStorage.setItem('root', JSON.stringify(payload))

  }, [state.uid, state.auth, state.user_type])

  return(
    <DataContext.Provider value={{
      userData,
      stockData,
      allUsersData,
      state,
      dispatch
      }}>
      {children}
    </DataContext.Provider>
  )
} 