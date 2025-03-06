import React from 'react'

const DetailsContext = React.createContext ({
    imageArray: {},
    setImageArray:()=> {},
    detailImage: {},
    setDetailImage: ()=>{},
    details: {},
    setDetails: ()=>{},
    departments: {},
    setDepartments: () => {}
})

export default DetailsContext