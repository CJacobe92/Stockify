  import { useMutation, useQueryClient } from '@tanstack/react-query'
  import React from 'react'
  import { API } from './fetchUtils'

  const fetchLogout = ( ) => {

    const user_type = JSON.parse(localStorage.getItem('root'))?.user_type
    const queryClient = useQueryClient();

    return useMutation(async() => {
      try { 
        
        const uid = JSON.parse(localStorage.getItem('root'))?.uid

        const res = await API.post(`/auth/logout/${uid}`)
    
        if(res.status <= 300 && res.status >= 200){
          return res.data
        }
        
      } catch(err) {
        throw err.response.data.error
      }
    }, {
      onMutate: (variables) => {
        queryClient.cancelQueries({queryKey: ['userData']});
        queryClient.cancelQueries({queryKey: ['allUsersData']});
        return variables
      },
      onSuccess: (context, variables) => {
        if(context.message == 'Logout successful'){
          variables.dispatch({type: 'LOGOUT'})
          localStorage.clear()
          variables.navigate('/login')
        }
      }, 
    })
  }

  export default fetchLogout