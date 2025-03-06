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
  const [departments, setDepartments] = useState([])
  const [departmentData, setDepartmentData] = useState([])
  // const [selectedDepartment, setSelectedDepartment] = useState(null);
  const value = {
    imageArray,
    setImageArray,
    detailImage,
    setDetailImage,
    details,
    setDetails,
    departments,
    setDepartments,
    departmentData,
    setDepartmentData,
    // selectedDepartment,
    // setSelectedDepartment
  }


  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/objects")
      .then(res => res.json())
      .then(data => {
        let objIds = data.objectIDs;
        let homeImageIndex = [];

        for (let i = 0; i < 150; i++) {
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

  //Fetch for categories dropdown menu
  useEffect(() => {
    fetch("https://collectionapi.metmuseum.org/public/collection/v1/departments")
      .then(res => res.json())
      .then(data => {
        setDepartments(data.departments)
        let depts = data.departments.map(id => id.departmentId);
        let deptId = [];
        deptId.push(depts)


      return Promise.all(
        deptId.map(i =>

          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/?departmentId=${[i]}`)
            .then(res => {res.json()
              console.log([i])
            })
      )
      )
      })
        .then(results => {
          let filteredDept = results.filter(obj => obj.primaryImage !== "");
          setDepartmentData(filteredDept);
          })

      .catch(error => console.error("Error fetching object details:", error));
    }, []);


  return (
<DetailsContext.Provider value={value}>

  <div className="app-container">
    <input type="checkbox" id="nav-toggle" />
    <header className="header">
      <label htmlFor="nav-toggle" className="nav-toggle-label">
        <span className="hamburger"></span> {/* Hamburger menu icon */}
      </label>
      <h1>Desmond Takes The Met</h1>
    </header>

    <nav className="icon-sidebar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        <span className="nav-icon">🏠</span>
      </Link>

      <Link to="/layout" className={location.pathname === "/layout" ? "active" : ""}>
        <span className="nav-icon">📱</span>
      </Link>

      <Link to="/saved" className={location.pathname === "/saved" ? "active" : ""}>
        <span className="nav-icon">⭐</span>
      </Link>
    </nav>


    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Navigation</h2> {/* Sidebar title */}
      </div>
      <div className="sidebar-content">
        {/* Home Navigation Link (Closes Sidebar on Click) */}
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
          onClick={() => (document.getElementById("nav-toggle").checked = false)}
        >
          <span className="nav-icon">🏠</span> Home
        </Link>

        {/* Layout Navigation Link */}
        <Link
          to="/layout"
          className={location.pathname === "/layout" ? "active" : ""}
          onClick={() => (document.getElementById("nav-toggle").checked = false)}
        >
          <span className="nav-icon">📱</span> Layout
        </Link>

        {/* Saved Items Navigation Link */}
        <Link
          to="/saved"
          className={location.pathname === "/saved" ? "active" : ""}
          onClick={() => (document.getElementById("nav-toggle").checked = false)}
        >
          <span className="nav-icon">⭐</span> Saved Items
        </Link>
      </div>
    </nav>

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
