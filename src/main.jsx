import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DataContextProvider } from './providers/DataContextProvider.jsx'
import { QueryClient, QueryClientProvider} from '@tanstack/react-query'

const queryClient =  new QueryClient

ReactDOM.createRoot(document.getElementById('root')).render(
 
  <React.StrictMode>
      <BrowserRouter >
        <QueryClientProvider client={queryClient}>
          <DataContextProvider>
            <App />
          </DataContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    
  </React.StrictMode>,
)
