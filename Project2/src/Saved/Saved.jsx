import SavedContext from '../SavedContext.jsx'
import {useContext} from 'react'
import {Link} from 'react-router-dom'
import './Saved.css'

export default function Saved() {
const {savedArray, setSavedArray} = useContext(SavedContext);
// let savedIsEmpty = savedArray == [];
const handleClear = () => {
  setSavedArray([]);
  localStorage.setItem("savedItems", JSON.stringify([]));
};
  return (
    <>
    <h3>Saved</h3>
    <div className="gallery-container">
    {savedArray?.map((element, i) => {
      return (
        <div key={element.objectID}>
          <Link to={`/details/${element.objectID}`} style={{textDecoration: 'none'}}>
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
    </div>
    {savedArray?.length > 0 && (
        <button className="clear-btn" onClick={handleClear}>
          Clear
        </button>
      )}
    </>
  )
}