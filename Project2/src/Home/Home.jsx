import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Home.css';

export default function Home({value}) {
const [imageCount, setImageCount] = useState(24);
const [isLoading, setIsLoading] = useState(true);
const [selectedDepartment, setSelectedDepartment] = useState(null);

// let homeItemArray = value.imageArray.slice(0,imageCount);
let homeItemArray = selectedDepartment
? value.departmentImageArray[
    value.departments.findIndex(
      (dept) => dept.departmentId === selectedDepartment
    )
  ]?.slice(0, imageCount) || []
: value.imageArray.slice(0, imageCount);

const handleDepartmentClick = (deptId) => {
  setSelectedDepartment(deptId);
  setImageCount(24); // Reset image count when switching departments
  };


useEffect (() => {
  if(value.imageArray.length > 0 && value.departmentImageArray.length > 0){
    setIsLoading(false)
  }
}), [value.imageArray, value.departmentImageArray]

const loadMoreImages = () => {

  setImageCount(newCount => newCount + 25);
}

if(isLoading){
  return (
    <div className="loader-container">
    <div className="loader"></div>
    <p>Loading...</p>
  </div>)
}

return (
<>
<h3 className="home-header"></h3>
      <div className="gallery-container">
        {homeItemArray && homeItemArray.length > 0 ? (
          homeItemArray.map((element, i) => (
            <div key={element.objectID}>
              <Link to={`/details/${element.objectID}`style={{textDecoration: 'none'}}>
                <div className="card-container">
                  <img
                    className="card-img"
                    src={element.primaryImage}
                    alt={element.objectName}
                    key={i}
                    height="200px"
                  />
                  <p>
                    <b className="title">Title:</b> {element.title} <br />
                    <b className="artist-name">Artist Name:</b>{" "}
                    {element.artistDisplayName === ""
                      ? "Unknown Artist"
                      : element.artistDisplayName}
                  </p>
                </div>
              </Link>

            </div>
          ))
        ) : (
          <div>No images found for this department</div>
        )}

        {/* Browse More Button */}
        {selectedDepartment
          ? // For department view
            value.departmentImageArray[
              value.departments.findIndex(
                (dept) => dept.departmentId === selectedDepartment
              )
            ]?.length > imageCount && (
              <div className="browse-more-container">
                <button className="browse-more-button" onClick={loadMoreImages}>
                  Browse More
                </button>
              </div>
            )
          : // For main view
            value.imageArray.length > imageCount && (
              <div className="browse-more-container">
                <button className="browse-more-button" onClick={loadMoreImages}>
                  Browse More
                </button>
              </div>
            )}

    {/* Right Sidebar */}
    <div className="right-sidebar">
      <h3>Departments</h3>
      <div className="department-buttons">
        <button
          id="all-department-button"
          onClick={() => handleDepartmentClick(null)}
          className={selectedDepartment === null ? "active" : ""}
          >All Departments
        </button>

        {value.departments.map((dept) => (
          <button id='department-button'
              key={dept.departmentId}
              onClick={() => handleDepartmentClick(dept.departmentId)}
              className={selectedDepartment === dept.departmentId ? "active" : ""
                }
              >
                {dept.displayName}
              </button>
            ))}
          </div>
    </div>
  </div>
</>
  )
}



