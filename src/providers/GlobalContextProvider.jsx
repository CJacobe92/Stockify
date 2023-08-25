import { createContext, useEffect, useReducer } from "react";



const root = JSON.parse(localStorage.getItem('root'))

const initialState = {
  uid: root ? root.uid : null,
  auth: root ? root.auth : null,
  logoff_inprogress: false
}

const reducer = (state, action) => {
  switch(action.type){
    case 'SET_UID':
      return {...state, uid: action.uid};
    case 'SET_AUTH':
      return {...state, auth: action.auth};
    case 'LOGOFF_INPROGRESS':
      return {...state, logoff_inprogress: action.logoff_inprogress}
    case 'LOGOFF':
      return {...state, auth: null, uid: null}

    default:
      return state;
  }
}
export const GlobalContext = createContext(null)

export const GlobalContextProvider = ({children}) => {
  const [ state, dispatch ] = useReducer(reducer, initialState)

  useEffect(() => {
    const payload = {
      uid: state.uid,
      auth: state.auth
    }

    localStorage.setItem('root', JSON.stringify(payload))
  }, [state.uid, state.auth])

  return(
    <GlobalContext.Provider value={{state, dispatch}}>
      {children}
    </GlobalContext.Provider>
  )
}