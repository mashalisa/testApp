// npm install react-router-dom

import { useEffect } from 'react'
import { useAuth } from './hooks/useAuth'
import './App.css'
import AppRoute from './routes/AppRoute'


function App() {
  const { user, loading } = useAuth()
  console.log(loading, 'loading')

  useEffect(() => {
    console.log("USER CHANGED:", user);
  }, [user]);




  return (
    <AppRoute />
  )




}

export default App
