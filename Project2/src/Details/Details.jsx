import {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import DetailsContext from '../DetailsContext.jsx'
import './Details.css'
import SavedContext from '../SavedContext.jsx'

export default  function Details() {
const { imageArray, detailImage, setDetailImage, details, setDetails, departmentImageArray } = useContext(DetailsContext);
const { id } = useParams();
const {savedArray, setSavedArray} = useContext(SavedContext);

useEffect(() => {

  //Aqcuire our cached details first
  const cachedDetails = localStorage.getItem(`artwork-${id}`);
  if (cachedDetails){
    const parsedDetails = JSON.parse(cachedDetails);
    setDetails(parsedDetails);
    setDetailImage(parsedDetails.primaryImage);
    return;
  }

  // First check the main imageArray
  let artwork = imageArray.find((item) => item.objectID === parseInt(id));

  // If not found in imageArray, check departmentImageArray
  if (!artwork && departmentImageArray.length > 0) {
    // Flatten the department arrays and search
    departmentImageArray.forEach((departmentItems) => {
      const found = departmentItems.find(
        (item) => item.objectID === parseInt(id)
      );
      if (found) artwork = found;
    });
  }
  if (artwork) {
    //Cache the details
    localStorage.setItem(`artwork-${id}`, JSON.stringify(artwork));
    setDetails(artwork);
    setDetailImage(artwork.primaryImage);
  }
}, [id, imageArray, departmentImageArray, setDetails, setDetailImage]);

if (!details) {
  return <p className="loading">Loading...</p>;
}


return (
  <div className="details-container">
    <div className="department-container">
      <h2 id="department-name" ></h2>
    </div>

    <h1>{details.title}</h1>
    <div className="details-content">
      <div className="image-container">
        <button id='save-btn' onClick={()=>{
          if (!details.measurements)
            details.measurements = [{
              elementMeasurements:{
                Height: 10
              }
            }]
          let newSavedArray = [...savedArray,
         {objectID: details.objectID,
          measurements: details.measurements,
          primaryImage: details.primaryImage,
          title: details.title,
          artistDisplayName: details.artistDisplayName,
          objectName: details.objectName
        }
         ]

         setSavedArray (newSavedArray)
          }}
          ><p >💾</p></button>
        <img
          className="detail-image"
          src={details.primaryImage}
          alt={details.title}
        />
      </div>
      <div className="info-container">
        <p>
          <strong>Artist:</strong>{" "}
          {details.artistDisplayName || "Unknown Artist"}
        </p>
        <p>
          <strong>Date:</strong> {details.objectDate || "Unknown Date"}
        </p>
        <p>
          <strong>Medium:</strong> {details.medium || "Unknown Medium"}
        </p>
        <p>
          <strong>Dimensions:</strong>{" "}
          {details.dimensions || "Unknown Dimensions"}
        </p>
        <p>
          <strong>Classification:</strong>{" "}
          {details.classification || "Unknown Classification"}
        </p>
        <p>
          <strong>Culture:</strong> {details.culture || "Unknown Culture"}
        </p>
        <p>
          <strong>Period:</strong> {details.period || "Unknown Period"}
        </p>
        <p>
          <strong>Repository:</strong>{" "}
          {details.repository || "Unknown Repository"}
        </p>
        <p>
          <strong>Genre:</strong>{" "}
          {details.department || "Unknown Genre"}
        </p>
      </div>
    </div>
  </div>
);
}





//primaryImage, additionalImages, classification, culture, period, department, objectDate title, artistDisplayName, artistDisplayBio, artistBeginDate, artistEndDate, dimension

