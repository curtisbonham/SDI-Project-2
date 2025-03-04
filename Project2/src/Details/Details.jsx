import {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import DetailsContext from '../DetailsContext.jsx'
import './Details.css'

export default  function Details() {
const { imageArray, detailImage, setDetailImage, details, setDetails } = useContext(DetailsContext);
const { id } = useParams();

useEffect(() => {
  const artwork = imageArray.find((item) => item.objectID === parseInt(id));
  if (artwork) {
    setDetails(artwork);
    setDetailImage(artwork.primaryImage);
  }
}, [id, imageArray, setDetails, setDetailImage]);

if (!details) {
  return <p className="loading">Loading...</p>;
}

return (
  <div className="details-container">
    <h1>{details.title}</h1>
    <div className="details-content">
      <div className="image-container">
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
      </div>
    </div>
  </div>
);
}





//primaryImage, additionalImages, classification, culture, period, department, objectDate title, artistDisplayName, artistDisplayBio, artistBeginDate, artistEndDate, dimension

