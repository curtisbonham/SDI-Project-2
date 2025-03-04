import {useContext, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import DetailsContext from '../DetailsContext.jsx'

export default  function Details() {

  const {imageArray, detailImage, setDetailImage, details, setDetails} = useContext(DetailsContext)

  // console.log(imageArray);

  const {id} = useParams();


  useEffect(() => {
    if(!id || !imageArray.length) return;

   const foundDetails =  imageArray?.find(obj => obj.id === parseInt(id));
   if(foundDetails){
   setDetails(foundDetails)
   }

    if(!detailImage){
      setDetailImage(foundDetails.primaryImage)
    }
  }, [id, imageArray, setDetails, detailImage, setDetailImage])

if(!details){
  return <h1>Loading...</h1>
}

console.log(details)
  return (
    <>
    <h3>Details</h3>
    <div>
      <h2>Image Display Below</h2>
      {/* {details.primaryImage ? (
        <img src={detailImage} alt={details.title || "Image"}/>

      ): (
        <p>No Image Available</p>
      )} */}


    </div>
    </>

  )
}

//primaryImage, additionalImages, classification, culture, period, department, objectDate title, artistDisplayName, artistDisplayBio, artistBeginDate, artistEndDate, dimension

//const WalletDetails = ({value}) => {
//   const { wallets, currentWalletImage, setCurrentWalletImage } = useContext(WalletContext);
//   const { id } = useParams();
//   const wallet = wallets?.find(w => w.id === parseInt(id));

//   if (!wallet) {
//     return <p>Loading...</p>;
//   }

//   if(!currentWalletImage){
//     setCurrentWalletImage(wallet.image)
//   }

// return (
// <>
// <div>
//   <h1>{wallet.name}</h1>
//   <img className='MainImage' src={currentWalletImage} alt={wallet.name} style={{width: '400px'}}/>
//   <img className='SmallImage' src={wallet.image} alt={wallet.name} style={{width: '200px'}} onClick={() => setCurrentWalletImage(wallet.image)}/>
//   <img className='SmallImage' src={wallet.back} alt={wallet.name} style={{width: '200px'}} onClick={() => setCurrentWalletImage(wallet.back

//   )}/>

//   <div>
//     Specifications:
//     <p>Price: ${wallet.price}</p>
//     <p>{wallet.info[0]}, {wallet.info[1]}, {wallet.info[2]}</p>
//     <p>{wallet.info[3]}</p>
//     <p>{wallet.info[4]}</p>
//     <p>{wallet.info[5]}</p>
//     <p>{wallet.info[6]}</p>
//     <p>{wallet.info[7]}</p>
//     <p>{wallet.info[8]}</p>
//   </div>
// </div>

//   </>