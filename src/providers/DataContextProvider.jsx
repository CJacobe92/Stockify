import { createContext, useEffect, useMemo, useReducer } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";
import fetchAllUsersData from "../services/fetchAllUsersData";

export const DataContext = createContext(null)

export const DataContextProvider = ({children}) => {

  const {data: userData, isLoading: userIsLoading, isFetching: userIsFetching} = fetchUserData();
  const {data: stockData, isLoading: stockIsLoading } = fetchStockData();
  const {data: allUsersData, isLoading: allUsersIsLoading, isFetching: allUsersIsFetching} = fetchAllUsersData();

  return(
    <DataContext.Provider value={{
      userData,
      userIsLoading,
      userIsFetching,
      stockData,
      stockIsLoading,
      allUsersData,
      allUsersIsLoading,
      allUsersIsFetching,
      }}>
      {children}
    </DataContext.Provider>
  )
} 