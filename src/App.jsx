import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Review from './pages/Review'

const App = () => {
  return (
    <Routes>
      <Route path={'/'} element={<Register />}/>
      <Route path={'/review'} element={<Review />}/>

    </Routes>
  )
}

export default App