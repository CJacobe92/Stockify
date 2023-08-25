import { useContext } from "react"
import { useQuery, useMutation, useQueryClient, } from "@tanstack/react-query"
import { GlobalContext } from "./GlobalContextProvider"
import { useNavigate } from "react-router-dom"

export const useFetchRegister = () => {

  const navigate = useNavigate();

  return useMutation(async(payload) => {
    const baseURL = `${import.meta.env.VITE_API_URL}/users`

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'user': payload})
    }
    const response = await fetch(baseURL, requestOptions)

    const result = await response.json();
    return result

  },{
    cacheTime: 0, 
    refetchOnMount: false,          // Fetch data when the query is mounted
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      return navigate('/review')
    },
    onError: (error) => {
      console.error(error)
    }
  }
)}

export const useFetchLogin = () => {

  const navigate = useNavigate()
  const {dispatch} = useContext(GlobalContext)

  return useMutation(async(payload) => {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/login`

    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({'auth': payload})
    }

    const response = await fetch(baseURL, requestOptions)

    if(response){
      const result = {
        uid: response.headers.get('Uid'),
        auth: response.headers.get('Authorization'),
        activated: response.headers.get('Activated'),
        otp_enabled: response.headers.get('Otp_enabled'),
        otp_required: response.headers.get('Otp_required')
      }
      return result
    }
    
      
  }, {
    cacheTime: 0, 
    refetchOnMount: false,          // Fetch data when the query is mounted
    refetchOnWindowFocus: false,
    onSuccess: (data) => {

      dispatch({type: 'SET_UID', uid: data.uid})
      dispatch({type: 'SET_AUTH', auth: data.auth})


      if (data.activated === 'false') {
        navigate('/review');
      } 
      
      if (data.activated === 'true' && data.otp_enabled === 'false' ) {
        navigate('/enableotp');
      } 
      
      if (data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'true') {
        navigate('/verifyotp')
      } 
      
      if (data.activated === 'true' && data.otp_enabled === 'true' && data.otp_required === 'false') {
        navigate('/portfolio')
      }

      console.log(data)
      return data
    },
    onError: (error) => {
      console.error(error)
    }
  }
)}

export const useFetchLogout = () => {

  const queryClient = useQueryClient()

  const navigate = useNavigate()
  const {state, dispatch} = useContext(GlobalContext)

  return useMutation(['logout'], async() => {

    const {uid, auth} = state

    if(uid, auth){
      const baseURL = `${import.meta.env.VITE_API_URL}/auth/logout/${uid}`

      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        }
    }

    const response = await fetch(baseURL, requestOptions)

    const result = await response.json();

    return result
    }
    
  }, {
    staleTime: 1,
    cacheTime: 0, 
    refetchOnMount: false,          // Fetch data when the query is mounted
    refetchOnWindowFocus: false,
    onMutate: () => {
      queryClient.cancelQueries({ queryKey: ['user'] })
      const authVars = {
        auth: state.auth,
        uid: state.uid
      }
      
      return authVars
    },
    onSuccess: () => {

      dispatch({type:'LOGOFF'})
      navigate('/login')
    },
    onError: (error) => {
      console.error(error)
    }
  }
)}


export const useFetchConfigureOTP = () => {
  
  const {state} = useContext(GlobalContext)

  const auth =  state.auth
  const uid = state.uid

  return useQuery(['configure_otp'], async() => {

    if(uid, auth){
      const baseURL = `${import.meta.env.VITE_API_URL}/auth/configure_otp/${uid}`

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': auth
        },
      }
      const response = await fetch(baseURL, requestOptions)
      const result = await response.json()  
      return result
    }
    
  }, {
    cacheTime: 0, 
    refetchOnMount: true,          // Fetch data when the query is mounted
    refetchOnWindowFocus: false,   
    onSuccess: (data) => {
      console.log(data)
    },
    onError: (error) => {
      console.error(error)
    }
  }
)}


export const useFetchActivateAccount = () => {
  return useMutation(['activate_account'], async(auth) => {
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/activate?token=${auth}`

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth 
      }
    }

    await fetch(baseURL, requestOptions)

  }, {
    cacheTime: 0, 
    refetchOnMount: true,          // Fetch data when the query is mounted
    refetchOnWindowFocus: false, 
  }
)}

export const useFetchEnableOTP = () => {

  const {state, dispatch} = useContext(GlobalContext)

  return useMutation(['enable_otp'], async(pin) => {
    
    const {uid, auth} = state
    
    const baseURL = `${import.meta.env.VITE_API_URL}/auth/enable_otp/${uid}`

    const requestOptions = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth 
      },
      body: JSON.stringify({'auth': {"otp": pin}})
    }

    const response = await fetch(baseURL, requestOptions)

    if(response){
      const result = {
        uid: response.headers.get('Uid'),
        auth: response.headers.get('Authorization'),
        activated: response.headers.get('Activated'),
        otp_enabled: response.headers.get('Otp_enabled'),
        otp_required: response.headers.get('Otp_required')
      }
      return result
    }
    
  }, {
    cacheTime: 0, 
    refetchOnMount: false,          // Fetch data when the query is mounted
    refetchOnWindowFocus: false,
    onMutate: () => {
      const authVars = {
        uid: state.uid,
        auth: state.auth
      }
      return authVars
    },
    onSuccess: (data) => {
      dispatch({type: 'SET_UID', uid: data.uid})
      dispatch({type: 'SET_AUTH', auth: data.auth})

    },
    onError: (error) => {
      console.error(error)
    }
  })}

export const fetchVerifyOTP = async(uid, auth, pin) => {

  const baseURL = `${import.meta.env.VITE_API_URL}/auth/verify_otp/${uid}`

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth 
    },
    body: JSON.stringify({'auth': {"otp": pin}})
  }
  const response = await fetch(baseURL, requestOptions)

  if (response.ok) {
    const payload = {
      uid: response.headers.get('Uid'),
      auth: response.headers.get('Authorization'),
      activated: response.headers.get('Activated'),
      otp_enabled: response.headers.get('Otp_enabled'),
      otp_required: response.headers.get('Otp_required'),
      ok: true
    }

    return payload
  } else {
    console.error('Failed to fetch')
  }
}

export const useFetchUserData = () => {

  const {state} = useContext(GlobalContext)

  const auth =  state.auth
  const uid = state.uid

  return useQuery(['user', uid], async() => {
    const baseURL = `${import.meta.env.VITE_API_URL}/users/${uid}`

    const requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': auth 
      }  
    }

    const response = await fetch(baseURL, requestOptions)
    const result = await response.json();
    return result
    },{
      enabled: !!auth,
      onSuccess: (data) => {
        console.log(data)
      },
      select: (data) => {
        const user = data.data
        const accounts = data.data.accounts

        return{
          user: user,
          accounts: accounts
        }
      }
    })
}






