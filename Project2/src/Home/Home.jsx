import {React} from 'react'
import {Link} from 'react-router-dom'
import './Home.css';

export default function Home({value}) {
let homeItemArray = value.imageArray.slice(0,24);<select name="" id=""></select>


return (

  <>
    <h3 className='home-header'>Home</h3>
    <div className= 'gallery-container'>
      {homeItemArray?.map((element, i) => {
        return (
          <div key={element.objectID}>
            <Link to={`/details/${element.objectID}`}>
          <div className='card-container'>
            <img className='card-img'
              src={element.primaryImage}
              alt={element.objectName}
                key={i}
                height='200px'
                ></img>
              <p><b>Title:</b> {element.title} <br/>
               <b>Artist Name:</b> {element.artistDisplayName == ''? 'Unknown Artist' : element.artistDisplayName}</p>

          </div>
          </Link>
          </div>

        )
      })}

    </div>
  </>
  )
}
