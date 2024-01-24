import React, { createContext, useState } from 'react'

//creae contextApi
export const addProjectResponseContext = createContext()
export const editProjectResponseContext = createContext()
export const isAuthTokenContext = createContext()

//children is a predefined prop used to share data btw all components
function ContextShare({children}) {
    //data to share
    const [addProjectResponse,setAddProjectResponse] = useState({})

    const [editProjectResponse,setEditProjectResponse] = useState({})

    const [isAuthToken , setIsAuthToken] = useState(true)

  return (

    <>
        {/* {only provider can provide data and value attribute is used to specify the data to share} */}
    <addProjectResponseContext.Provider value={{addProjectResponse,setAddProjectResponse}}>
          <editProjectResponseContext.Provider value={{editProjectResponse,setEditProjectResponse}}>
              <isAuthTokenContext.Provider value={{isAuthToken , setIsAuthToken}}>

                {children}

              </isAuthTokenContext.Provider>          
          </editProjectResponseContext.Provider>
    </addProjectResponseContext.Provider>

    </>
  )
}

export default ContextShare