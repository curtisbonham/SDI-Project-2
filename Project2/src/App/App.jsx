import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from "../Home/Home.jsx";
import Layout from '../Layout/Layout.jsx'
import Saved from '../Saved/Saved.jsx'
import Details from '../Details/Details.jsx'
import DetailsContext from '../DetailsContext.jsx'


function App() {
  const [imageArray, setImageArray] = useState([])
  const [detailImage, setDetailImage] = useState('')
  const [details, setDetails] = useState([])
  const value = {imageArray, setImageArray, detailImage, setDetailImage, details, setDetails}

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
        let filteredImages = results.filter(obj => obj.primaryImage !== "");
        setImageArray(filteredImages);
      })
      .catch(error => console.error("Error fetching object details:", error));

  }, []);

  return (
    <DetailsContext.Provider value={value}>
      <div className="app-container">
        {/* Checkbox for drawer toggle */}
        <input type="checkbox" id="nav-toggle" />

        {/* Header */}
        <header className="header">
          <label htmlFor="nav-toggle" className="nav-toggle-label">
            <span className="hamburger"></span>
          </label>
          <h1>Met Gallery</h1>
        </header>

        {/* Sidebar Overlay */}
        <div className="sidebar-overlay"></div>

        {/* Sidebar Navigation */}
        <nav className="sidebar">
          <div className="sidebar-header">
            <h2>Navigation</h2>
          </div>
          <div className="sidebar-content">
            <Link
              to="/"
              className={location.pathname === "/" ? "active" : ""}
              onClick={() =>
                (document.getElementById("nav-toggle").checked = false)
              }
            >
              <span className="nav-icon">🏠</span>
              Home
            </Link>
            <Link
              to="/layout"
              className={location.pathname === "/layout" ? "active" : ""}
              onClick={() =>
                (document.getElementById("nav-toggle").checked = false)
              }
            >
              <span className="nav-icon">📱</span>
              Layout
            </Link>
            <Link
              to="/saved"
              className={location.pathname === "/saved" ? "active" : ""}
              onClick={() =>
                (document.getElementById("nav-toggle").checked = false)
              }
            >
              <span className="nav-icon">⭐</span>
              Saved Items
            </Link>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home value={value} />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/layout" element={<Layout />} />
            <Route path="/saved" element={<Saved />} />
          </Routes>
        </main>
      </div>
    </DetailsContext.Provider>
  );
}

export default App;

//     {/* <DetailsContext.Provider value={value}>
//     <h1 className='header'>Desmond Takes the Met</h1>
//     <div className='navbar'>
//         <Link to='/'><button>Home</button></Link>
//         <Link to='/layout'><button>Layout</button></Link>
//         <Link to='/saved'><button>Saved</button></Link>
//       </div>
//       <Routes>
//         <Route path='/' element={<Home value={value} />}/>
//         <Route path='/details/:id' element={<Details />}/>
//         <Route path='/layout' element={<Layout />}/>
//         <Route path='/saved' element={<Saved />}/>
//       </Routes>
//     // </DetailsContext.Provider>

//     </>
//   )
// }


