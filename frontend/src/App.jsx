// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// import './App.css'
import Login from './components/auth/Login'
import Home from './components/Home/Home'
import SignUp from './components/auth/signUp'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobsDesription from './components/JobsDesription'
import Logout from './components/Logout'
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
    {
      path: '/jobs',
      element: <Jobs />
    },
    {
      path: '/browse',
      element: <Browse />
    },
    {
      path:'/job/descrption/:id',
      element:<JobsDesription/>
    },
    {
      path: '/profile',
      element: <Profile />

    },
    {
      path:'/logout',
      element:<Logout/>
    }
  ])
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}

export default App
