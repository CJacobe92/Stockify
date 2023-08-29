import { createContext, useEffect, useReducer, useState } from "react";
import fetchUserData from "../services/fetchUserData";
import fetchStockData from "../services/fetchStockData";

const root = JSON.parse(localStorage.getItem('root'))

const initialState = {
  uid: root ? root.uid : null,
  auth: root ? root.auth : null,
  activated: null,
  otp_required: null,
  otp_enabled: null,
  data: null,
  stock_data: null,
  isLoading: false,
  error: null,
  selected: null,
  accounts: null,
  account_id: null,
  portfolios: null,
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_UID':
      return {...state, uid: action.uid};
    case 'SET_AUTH':
      return {...state, auth: action.auth};
    case 'SET_DATA':
      return {...state, data: action.data }
    case 'SET_STOCK_DATA':
      return {...state, stock_data: action.stock_data }
    case 'SET_ISLOADING':
      return {...state, isLoading: action.isLoading }
    case 'SET_ERROR':
      return {...state, error: action.error }
    case 'SET_SELECTED':
      return {...state, selected: action.selected}
    case 'SET_ACCOUNTS':
      const account = action.accounts.flatMap((account) => (
        {
          id: account.id,
          balance: account.balance
        }
      ))
      return {...state, accounts: account}
    case 'SET_ACCOUNT_ID':
      return {...state, account_id: action.account_id}
    case 'SET_PORTFOLIOS':
      const portfolios = action.portfolios.flatMap((account) => (
         account.portfolios !=  undefined ? account.portfolios.flatMap((portfolio) => (
          {
            symbol: portfolio.symbol,
            description: portfolio.description,
            current_price: portfolio.current_price,
            percent_change: portfolio.percent_change,
            avg_purchase_price: portfolio.average_purchase_price,
            total_quantity: portfolio.total_quantity,
            total_value: portfolio.total_value,
            total_gl: portfolio.total_gl,
            stock_id: portfolio.stock_id,
            account_id: portfolio.account_id
          }
        )) : null
      ))
      return {...state, portfolios: portfolios}

    case 'LOGOFF':
      return {...state, auth: null, uid: null}

    default:
      return state;
  }
}

export const GlobalContext = createContext(null)

export const GlobalContextProvider = ({children}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null)
  const [ state, dispatch ] = useReducer(reducer, initialState);

  const {uid, auth} = state

  useEffect(() => {
    const payload = {
      uid: uid,
      auth: auth
    }

    localStorage.setItem('root', JSON.stringify(payload))
  }, [uid, auth])

  useEffect(() => {
    const getUserData = async() => {
      try {

        if (uid, auth) {
          dispatch({type: 'SET_ISLOADING', isLoading: true})
          
          const data = await fetchUserData(uid, auth)

          if (isLoading) {
            return <FetchLoading />
          } else if(data) {
            dispatch({type: 'SET_DATA', data: data })
            dispatch({type: 'SET_ACCOUNTS', accounts: data.accounts})
            dispatch({type: 'SET_PORTFOLIOS', portfolios: data.accounts})

          }
          
        }
      } catch(error) {
        dispatch({type: 'SET_ERROR', error: error})
  
      } finally {
        dispatch({type: 'SET_ISLOADING', isLoading: false})
        dispatch({type: 'SET_ERROR', error: null})
      }
    }
  
    const getStockData = async() => {
      try {

        if (uid, auth) {
          dispatch({type: 'SET_ISLOADING', isLoading: true})
          
          const data = await fetchStockData(uid, auth)

          if (isLoading) {
            return <FetchLoading />
          } else if(data) {
            dispatch({type: 'SET_STOCK_DATA', stock_data: data })
          }
          
        }
        
      } catch(error) {
        dispatch({type: 'SET_ERROR', error: error})
      } finally {
        dispatch({type: 'SET_ISLOADING', isLoading: false})
        dispatch({type: 'SET_ERROR', error: null})
      }
    }

    if(uid, auth){
      getUserData();
      getStockData();
    }
    
  }, [uid, auth, dispatch])

  return(
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}