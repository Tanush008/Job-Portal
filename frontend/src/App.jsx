// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import Login from './components/auth/Login'
import Home from './components/Home/Home'
import SignUp from './components/auth/signUp'
function App() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/signup',
      element: <SignUp />
    },
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
