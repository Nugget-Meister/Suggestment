import { createContext, useContext, useEffect, useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import Home from './components/Home/Home'
import Redirect from './components/Redirect/Redirect'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Verify from './components/Verify/Verify.jsx'


import {UserContext} from './components/subcomponents/context.js'
import VerifySignIn from './components/VerifySignIn/VerifySignIn.jsx'
import { verifyToken } from './components/subcomponents/apicalls.js'
import PrivateRoute from './components/subcomponents/PrivateRoute.jsx'
import Profile from './components/Profile/Profile.jsx'
import Reset from './components/Reset/Reset.jsx'
import Transaction from './components/Transaction/Transaction.jsx'

const delta = import.meta.env.VITE_API_DELTA

function App() {

  // const sessionToken = window.localStorage.getItem('sessionToken')
  // console.log(sessionToken)

  // useEffect(() => {
  //   verifyToken(sessionToken)
  //   .then(res => {
  //     if(res.message == "OK" && res != false){
  //       // console.log('success')
  //       window.localStorage.setItem('valid', true)
  //     } else {
  //       // console.log('bad')
  //       window.localStorage.setItem('valid', false)
  //     }
  //   })
  // },[sessionToken])



  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<PrivateRoute path={'/'} element={<Home/>}/>} />
          <Route path={'/transaction/:id'} element={<PrivateRoute path={'/'} element={<Transaction/>}/>} />          <Route path={'/profile'} element={<PrivateRoute path={'/'} element={<Profile/>}/>} />
          <Route path={'/reset/:token'} element={<Reset/>}/>
          <Route path={'/signin'} element={<SignIn/>}/>
          <Route path={'/signin/:token'} element={<VerifySignIn/>}/>
          <Route path={'/signup'} element={<SignUp/>}/>
          <Route path={'/verify/'} element={<Verify/>}/>
          <Route path={'/verify/:id'} element={<Verify/>}/>
          <Route path={'/*'} element={<Redirect/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
