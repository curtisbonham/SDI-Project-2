import React from 'react'

const DetailsContext = React.createContext ({
    imageArray: {},
    setImageArray:()=> {},
    detailImage: {},
    setDetailImage: ()=>{},
    details: {},
    setDetails: ()=>{}
})

export default DetailsContext