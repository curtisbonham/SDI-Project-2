import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "../Home/Home.jsx";
import Layout from '../Layout/Layout.jsx'
import Saved from '../Saved/Saved.jsx'
import Details from '../Details/Details.jsx'

function App() {
  const [imageArray, setImageArray] = useState([])

  useEffect (() => {
    fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects')
      .then(res => res.json())
      .then(data => {
        let objIds = data.objectIDs
        let homeImages = []
        while (imageArray.length < 26) {
          let imageArrayIndex= Math.random() * (data.total - 0 + 1)
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objIds[imageArrayIndex]}`)
            .then(res => res.json())
            .then(data => {
              if(data.primaryImage){
                homeImages.push(data)
              } 
              return homeImages
            })
        }
  })
  }, [])

  return (
    <>
      <div className='navbar'>
        <Link to='/'><button>Home</button></Link>
        <Link to='/layout'><button>Layout</button></Link>
        <Link to='/saved'><button>Saved</button></Link>
      </div>

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/details/:id' element={<Details />}/>
        <Route path='/layout' element={<Layout />}/>
        <Route path='/saved' element={<Saved />}/>
      </Routes>

    </>
  )
}

export default App
