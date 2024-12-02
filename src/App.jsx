import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import Home from './components/Home/Home'
import SignIn from './components/SignIn/SignIn'
import Redirect from './components/Redirect/Redirect'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/signin'} element={<SignIn/>}/>
        <Route path={'/*'} element={<Redirect/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
