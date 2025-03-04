import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "../Home/Home.jsx";
import Layout from '../Layout/Layout.jsx'
import Saved from '../Saved/Saved.jsx'
import Details from '../Details/Details.jsx'

function App() {
  const [imageArray, setImageArray] = useState([])
  const value = {imageArray}

  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
      .then(res => res.json())
      .then(data => {
        let objIds = data.objectIDs;
        let homeImageIndex = [];

        for (let i = 0; i < 100; i++) {
          let imageArrayIndex= Math.floor(Math.random() * (data.total - 0 + 1))
          homeImageIndex.push(imageArrayIndex);
        }

        return Promise.all(
          homeImageIndex.map(i =>
            fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objIds[i]}`)
              .then(res => res.json())
          )
        );
      })
      .then(results => {
        let filteredImages = results.filter(obj => obj.primaryImage !== ""); // Filter out empty images
        setImageArray(filteredImages); // Update state
      })
      .catch(error => console.error("Error fetching object details:", error));
  }, []); // Run once on mount

  console.log(imageArray)
  // console.log(imageArray)

  return (
    <>
      <div className='navbar'>
        <Link to='/'><button>Home</button></Link>
        <Link to='/layout'><button>Layout</button></Link>
        <Link to='/saved'><button>Saved</button></Link>
      </div>

      <Routes>
        <Route path='/' element={<Home value={value} />}/>
        <Route path='/details/:id' element={<Details />}/>
        <Route path='/layout' element={<Layout />}/>
        <Route path='/saved' element={<Saved />}/>
      </Routes>

    </>
  )
}

export default App
