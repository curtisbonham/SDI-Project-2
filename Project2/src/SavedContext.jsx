import React, {createContext} from 'react'

const SavedContext = createContext ({
    savedArray: [],
    setSavedArray:() => {},
})

export default SavedContext