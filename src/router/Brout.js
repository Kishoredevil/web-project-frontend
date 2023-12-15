import React from 'react'
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import App from '../component/App';
import Issuance from '../component/Issuance';
const Brout = () => {

  return (
    <Router>
      <Routes>
      <Route path='' element={localStorage.token?<Issuance/>:<App />}></Route>
    </Routes>
  </Router>
  )
}

export default Brout