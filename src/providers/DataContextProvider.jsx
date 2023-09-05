import { createContext, useEffect, useMemo, useReducer } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";

export const DataContext = createContext(null)

export const DataContextProvider = ({children}) => {

  const signOut = () => {
    dispatch({type: 'RESET_STATE', currentUser: null})
    localStorage.removeItem('root')
  }

  const {data: userData } = fetchUserData();
  const {data: stockData } = fetchStockData();

  return(
    <DataContext.Provider value={{
      userData,
      stockData
      }}>
      {children}
    </DataContext.Provider>
  )
} 