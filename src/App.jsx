import React from 'react'
import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router-dom'
import Home from "./components/Home"
import Paste from "./components/Paste"
import ViewPaste from './components/ViewPaste'
import Edit from './components/Edit'

function App() {
  return (
    <>
      <Navbar />
      <Routes>

        <Route path="/home" element={<Home />} />
        <Route path='/paste' element={<Paste />} />
        <Route path='/paste/:id' element={<ViewPaste />} />
        <Route path='/edit/:id' element={<Edit />} />


      </Routes>
    </>
  )
}

export default App


