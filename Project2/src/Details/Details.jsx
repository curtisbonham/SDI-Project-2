import {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import DetailsContext from '../DetailsContext.jsx'
import './Details.css'
import SavedContext from '../SavedContext.jsx'

export default  function Details() {
  const {
    imageArray,
    detailImage,
    setDetailImage,
    details,
    setDetails,
    departmentImageArray,
  } = useContext(DetailsContext);
const { id } = useParams();
const {savedArray, setSavedArray} = useContext(SavedContext);
const [isSaved, setIsSaved] = useState(false);
const [isImageLoaded, setIsImageLoaded] = useState(false);

useEffect(() => {
  // Check if the current item is already saved
  const isItemSaved = savedArray?.some(
    (item) => item.objectID === details?.objectID
  );
  setIsSaved(isItemSaved);
}, [details, savedArray]);

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

const handleSave = () => {
  if (isSaved) {
    const newSavedArray = savedArray.filter(
      (item) => item.objectID !== details.objectID
    );
    setSavedArray(newSavedArray);
    localStorage.setItem("savedItems", JSON.stringify(newSavedArray));
    setIsSaved(false);
  } else {
    const newSavedArray = [
      ...savedArray,
      {
        objectID: details.objectID,
        measurements: details.measurements,
        primaryImage: details.primaryImage,
        title: details.title,
        artistDisplayName: details.artistDisplayName,
        objectName: details.objectName,
      },
    ];
    setSavedArray(newSavedArray);
    localStorage.setItem("savedItems", JSON.stringify(newSavedArray));
    setIsSaved(true);
  }
};

if (!details) {
  return (
    <div className="loading">
      <div className="loader-pulse"></div>
      <p>Loading artwork details...</p>
    </div>
  );
}

return (
  <div className="details-container">
      <div className="department-container">
        <h2 id="department-name">{details.department || "All Departments"}</h2>
      </div>

      <h1>{details.title}</h1>
      <div className="details-content">
        <div className="image-container">
          <img
            className={`detail-image ${isImageLoaded ? "loaded" : ""}`}
            src={details.primaryImage}
            alt={details.title}
            onLoad={() => setIsImageLoaded(true)}
          />
          <button
            id="save-btn"
            onClick={handleSave}
            title={isSaved ? "Remove from saved" : "Save artwork"}
          >
            <p>{isSaved ? "❤️" : "🤍"}</p>
          </button>
        </div>
        <div className="info-container">
          {details.artistDisplayName && (
            <p>
              <strong>Artist:</strong> {details.artistDisplayName}
              {details.artistDisplayBio && (
                <span className="artist-bio">
                  {" "}
                  ({details.artistDisplayBio})
                </span>
              )}
            </p>
          )}
          {details.objectDate && (
            <p>
              <strong>Date:</strong> {details.objectDate}
            </p>
          )}
          {details.medium && (
            <p>
              <strong>Medium:</strong> {details.medium}
            </p>
          )}
          {details.dimensions && (
            <p>
              <strong>Dimensions:</strong> {details.dimensions}
            </p>
          )}
          {details.classification && (
            <p>
              <strong>Classification:</strong> {details.classification}
            </p>
          )}
          {details.culture && (
            <p>
              <strong>Culture:</strong> {details.culture}
            </p>
          )}
          {details.period && (
            <p>
              <strong>Period:</strong> {details.period}
            </p>
          )}
          {details.repository && (
            <p>
              <strong>Repository:</strong> {details.repository}
            </p>
          )}
          {details.department && (
            <p>
              <strong>Department:</strong> {details.department}
            </p>
          )}
          {details.creditLine && (
            <p className="credit-line">
              <em>{details.creditLine}</em>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}





//primaryImage, additionalImages, classification, culture, period, department, objectDate title, artistDisplayName, artistDisplayBio, artistBeginDate, artistEndDate, dimension

