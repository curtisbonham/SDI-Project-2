import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from "../Home/Home.jsx";
import Layout from '../Layout/Layout.jsx'
import Saved from '../Saved/Saved.jsx'
import Details from '../Details/Details.jsx'
import DetailsContext from '../DetailsContext.jsx'
import SavedContext from '../SavedContext.jsx'

function App() {
  const location = useLocation();
  const [imageArray, setImageArray] = useState([])
  const [detailImage, setDetailImage] = useState('')
  const [details, setDetails] = useState([])
  const [departments, setDepartments] = useState([])
  const [departmentData, setDepartmentData] = useState([])


  const [departmentImageArray, setDepartmentImageArray] = useState([])

  const [imageCount, setImageCount] = useState(() => {
    const saved = localStorage.getItem("imageCount");
    return saved ? parseInt(saved) : 24;
  });
  const [selectedDepartment, setSelectedDepartment] = useState(() => {
    const saved = localStorage.getItem("selectedDepartment");
    return saved === "null" || !saved ? null : parseInt(saved);
  });

  const [savedArray, setSavedArray] = useState(() => {
    try{
      const saved = localStorage.getItem('savedItems')
      return saved ? JSON.parse(saved) : [];
    }catch(error){
      console.error("Error loading saved items:", error)
      return[];
    }
    // const storedItems = localStorage.getItem('savedItems');
    // return storedItems === "null"? [] : JSON.parse(storedItems);
  });

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
departmentImageArray,
setDepartmentImageArray,
imageCount,
setImageCount,
selectedDepartment,
setSelectedDepartment
}
const savedValue = {
savedArray,
setSavedArray,
}

addEventListener('beforeunload', () => {
  localStorage.setItem('savedItems', JSON.stringify(savedArray));
  });

    // Save to localStorage when these values change
    useEffect(() => {
      localStorage.setItem("imageCount", imageCount.toString());
    }, [imageCount]);

    useEffect(() => {
      localStorage.setItem(
        "selectedDepartment",
        selectedDepartment === null ? "null" : selectedDepartment.toString()
      );
    }, [selectedDepartment]);


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

      return Promise.all(
        depts.map((deptId) =>
          fetch(`https://collectionapi.metmuseum.org/public/collection/v1/search?departmentId=${deptId}&q=cat`)
            .then((res) => res.json())
            .then((data) => {
              if (!data.objectIDs || data.objectIDs.length === 0) {
                return [];
              }
              let deptObjIds = data.objectIDs;
              // Take first 25 objects to avoid too many requests
              let limitedIds = deptObjIds.slice(0, 25);

              return Promise.all(
                limitedIds.map((objId) =>
                  fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objId}`)
                    .then((res) => res.json())
                )
              );
            })
          )
        )
        .then(results => {
          let filteredDepartmentImages = results.map((departmentObjects) =>
            departmentObjects.filter((obj) => obj && obj.primaryImage !== ""))
          setDepartmentImageArray(filteredDepartmentImages)
        })
        .catch(error => console.error("Error fetching object details:", error));
        })

    }, []);

  return (


  <SavedContext.Provider value={savedValue}>
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
              <span className="nav-icon">
              <img src="src/Assets/Home.png" />

              </span>
            </Link>

            <Link
              to="/layout"
              className={location.pathname === "/layout" ? "active" : ""}
            >
              <span className="nav-icon">
              <img src="/src/Assets/layoutIcon.png" /></span>
            </Link>

            <Link
              to="/saved"
              className={location.pathname === "/saved" ? "active" : ""}
            >
              <span className="nav-icon">
              <img src="/src/Assets/Heart.png" /></span>
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
          <span className="nav-icon"><img src="src/Assets/Home.png" /></span> Home
        </Link>

        {/* Layout Navigation Link */}
        <Link
          to="/layout"
          className={location.pathname === "/layout" ? "active" : ""}
          onClick={() => (document.getElementById("nav-toggle").checked = false)}
        >
          <span className="nav-icon"><img src="/src/Assets/layoutIcon.png" /></span> Layout
        </Link>

        {/* Saved Items Navigation Link */}
        <Link
          to="/saved"
          className={location.pathname === "/saved" ? "active" : ""}
          onClick={() => (document.getElementById("nav-toggle").checked = false)}
        >
          <span className="nav-icon"><img src="/src/Assets/Heart.png" /></span> Saved Items
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
</SavedContext.Provider>

  );
}

export default App;
