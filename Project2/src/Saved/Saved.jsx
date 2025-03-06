import SavedContext from '../SavedContext.jsx'
import {useContext} from 'react'
import {Link} from 'react-router-dom'

export default function Saved() {
const {savedArray, setSavedArray} = useContext(SavedContext);

  return (
    <>
    <h3>Saved</h3>
    {console.log(savedArray)}
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
    </>
  )
}