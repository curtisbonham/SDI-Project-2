import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './Home.css';

export default function Home({value}) {

const [imageCount, setImageCount] = useState(24);
const [isLoading, setIsLoading] = useState(true);
const [selectedDepartment, setSelectedDepartment] = useState(null);

let homeItemArray = value.imageArray.slice(0,imageCount);

const filteredImages = selectedDepartment
    ? homeItemArray.filter((item) => item.department === selectedDepartment)
    : homeItemArray;

const handleDepartmentClick = (deptId) => {
  setSelectedDepartment(deptId); // Set selected department
};

useEffect (() => {
  if(value.imageArray.length > 0){
    setIsLoading(false)
  }
}), [value.imageArray]

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
    {homeItemArray?.map((element, i) => {
      return (
        <div key={element.objectID}>
          <Link to={`/details/${element.objectID}`}>
            <div className="card-container">
              <img
                className="card-img"
                src={element.primaryImage}
                alt={element.objectName}
                key={i}
                height="200px"
              />
              <p>
                <b className='title'>Title:</b> {element.title} <br />
                <b className='artist-name'>Artist Name:</b>{" "}
                {element.artistDisplayName === ""
                  ? "Unknown Artist"
                  : element.artistDisplayName}
              </p>
            </div>
          </Link>
        </div>
      );
    })}

    {/* Browse More Button */}
    <div className="browse-more-container">
      <button className="browse-more-button" onClick={loadMoreImages}>
        Browse More
      </button>
    </div>

    {/* Right Sidebar */}
    <div className="right-sidebar">
      <h3>Departments</h3>
      <div className="department-buttons">
            {value.departments.map((dept) => (
              <button id='department-button'
                key={dept.departmentId}
                onClick={() => handleDepartmentClick(dept.departmentId)}
                className={
                  selectedDepartment === dept.departmentId ? "active" : ""
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

//
//   const [imageCount, setImageCount] = useState(24);
//   const [isLoading, setIsLoading] = useState(true);
//   const [selectedDepartment, setSelectedDepartment] = useState("all");
//   const [departmentImages, setDepartmentImages] = useState([]);

//   // Fetch images for a specific department
//   const fetchDepartmentImages = async (departmentId) => {
//     setIsLoading(true);
//     try {
//       // First, get all object IDs for the department
//       const response = await fetch(
//         `https://collectionapi.metmuseum.org/public/collection/v1/objects?departmentIds=${departmentId}`
//       );
//       const data = await response.json();

//       // Get 200 random indices
//       let randomIndices = [];
//       for (let i = 0; i < 200; i++) {
//         let randomIndex = Math.floor(Math.random() * data.objectIDs.length);
//         randomIndices.push(data.objectIDs[randomIndex]);
//       }

//       // Fetch details for each random object
//       const imagePromises = randomIndices.map((id) =>
//         fetch(
//           `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
//         ).then((res) => res.json())
//       );

//       const results = await Promise.all(imagePromises);

//       // Filter out images without required properties
//       const filteredImages = results.filter(
//         (obj) =>
//           obj &&
//           obj.primaryImage &&
//           obj.primaryImage !== "" &&
//           obj.objectID &&
//           obj.title
//       );
//       setDepartmentImages(filteredImages);
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching department images:", error);
//       setIsLoading(false);
//     }
//   };

//   // Initial load of all images
//   useEffect(() => {
//     if (value.imageArray.length > 0) {
//       // Filter out any images without required properties
//       const validImages = value.imageArray.filter(
//         (obj) =>
//           obj &&
//           obj.primaryImage &&
//           obj.primaryImage !== "" &&
//           obj.objectID &&
//           obj.title
//       );
//       setDepartmentImages(validImages);
//       setIsLoading(false);
//     }
//   }, [value.imageArray]);

//   // When department changes, fetch new images
//   useEffect(() => {
//     if (selectedDepartment !== "all") {
//       fetchDepartmentImages(selectedDepartment);
//     } else {
//       // Filter out any images without required properties
//       const validImages = value.imageArray.filter(
//         (obj) =>
//           obj &&
//           obj.primaryImage &&
//           obj.primaryImage !== "" &&
//           obj.objectID &&
//           obj.title
//       );
//       setDepartmentImages(validImages);
//     }
//   }, [selectedDepartment]);

//   // Get displayed images based on current count
//   const displayedImages = departmentImages.slice(0, imageCount);

//   // Load more images handler
//   const loadMoreImages = () => {
//     setImageCount((prevCount) => prevCount + 24);
//   };

//   // Handle clicking on an item
//   const handleItemClick = (item) => {
//     if (item && item.primaryImage) {
//       value.setDetailImage(item.primaryImage);
//       value.setDetails(item);
//     }
//   };

//   // --- Loading State ---
//   if (isLoading) {
//     return (
//       <div className="loader-container">
//         <div className="loader"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="page-container">
//       {/* Main Content Area */}
//       <div className="main-content">
//         <h3 className="home-header">
//           {selectedDepartment === "all"
//             ? "All Departments"
//             : `Viewing: ${
//                 value.departments.find(
//                   (d) => d.departmentId === selectedDepartment
//                 )?.displayName
//               }`}
//         </h3>
//         <div className="gallery-container">
//           {/* Map through images and create cards for each one */}
//           {displayedImages &&
//             displayedImages.map((element) =>
//               element && element.objectID ? (
//                 <div key={element.objectID}>
//                   <Link
//                     to={`/details/${element.objectID}`}
//                     onClick={() => handleItemClick(element)}
//                   >
//                     <div className="card-container">
//                       <img
//                         className="card-img"
//                         src={element.primaryImage}
//                         alt={element.title || "Artwork"}
//                         height="200px"
//                       />
//                       <p>
//                         <b>Title:</b> {element.title || "Untitled"} <br />
//                         <b>Artist Name:</b>{" "}
//                         {element.artistDisplayName || "Unknown Artist"}
//                       </p>
//                     </div>
//                   </Link>
//                 </div>
//               ) : null
//             )}

//           {/* Browse More Button - Shows 24 more images when clicked */}
//           {imageCount < departmentImages.length && (
//             <div className="browse-more-container">
//               <button className="browse-more-button" onClick={loadMoreImages}>
//                 Browse More
//               </button>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Department Sidebar */}
//       <div className="right-sidebar">
//         <h3>Departments</h3>
//         <div className="department-buttons">
//           <button
//             className={`department-button ${
//               selectedDepartment === "all" ? "active" : ""
//             }`}
//             onClick={() => setSelectedDepartment("all")}
//           >
//             All Departments
//           </button>
//           {value.departments.map((dept) => (
//             <button
//               key={dept.departmentId}
//               className={`department-button ${
//                 selectedDepartment === dept.departmentId ? "active" : ""
//               }`}
//               onClick={() => setSelectedDepartment(dept.departmentId)}
//             >
//               {dept.displayName}
//             </button>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }




