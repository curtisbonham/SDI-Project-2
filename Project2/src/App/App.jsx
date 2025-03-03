import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "./Home/Home.jsx";

// import Layout from '/Layout/Layout.jsx'
// import Saved from '/Home/Home.jsx'
// import Details from '/Home/Home.jsx'
//import Home from "./Home";

function App() {

  return (
    <>
    <sidebar>
      <button onClick={() => {
        <Link to='/'>Home</Link>
      }}></button>
      {/* <button onClick={() => {
        <Link to='/layout'>Layout</Link>
      }}></button>
      <button onClick={() => {
        <Link to='/saved'>Saved</Link>
      }}></button> */}
    </sidebar>

      <Routes>
        <Route path='/' element={<Home />}/>
        {/* <Route path='/details/:id' element={<Details />}/>
        <Route path='/layout' element={<Layout />}/>
        <Route path='/saved' element={<Saved />}/> */}
      </Routes>

    </>
  )
}

export default App
