import React, {createContext} from 'react'

const SavedContext = createContext ({
    imageArray: {},
    setImageArray:()=> {}
})

export default SavedContext