import { createContext, useContext, useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import Home from './components/Home/Home'
import Redirect from './components/Redirect/Redirect'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'

import {UserContext} from './components/subcomponents/context.js'

const delta = import.meta.env.VITE_API_DELTA

function App() {

  const [userState, setUserState] = useState({
    email: null,
    id: null,
    token: delta || ''
  })

  // console.log(delta)


  return (
    <>
      <Router>
    <UserContext.Provider value={userState}>
        <Routes>
          <Route path={'/'} element={<Home/>} />
          <Route path={'/signin'} element={<SignIn/>}/>
          <Route path={'/signup'} element={<SignUp/>}/>
          <Route path={'/*'} element={<Redirect/>}/>
        </Routes>
    </UserContext.Provider>
      </Router>
    </>
  )
}

export default App
