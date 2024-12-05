import { useState } from 'react'
import {Route, BrowserRouter as Router, Routes} from "react-router-dom"
import './App.css'
import Home from './components/Home/Home'
import Redirect from './components/Redirect/Redirect'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'


function App() {

  const [userState, setUserState] = useState({
    email: null,
    token: null
  })

  return (
    <>
    <Router>
      <Routes>
        <Route path={'/'} element={<Home/>} />
        <Route path={'/signin'} element={<SignIn/>}/>
        <Route path={'/signup'} element={<SignUp/>}/>
        <Route path={'/*'} element={<Redirect/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
