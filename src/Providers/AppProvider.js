import React, { useState } from "react";
import {Image , View ,ActivityIndicator} from 'react-native'
import { IMAGE } from "../Constant/Images";

export const AppContext = React.createContext()

export default AppProvider = ({ children }) => {
    //  useEffect(() => requestUserPermission(), [])
    const [loading, setLoading] = useState(false)
    const [ActivePopup, setActivePopup] = useState(false)
    const [ActiveErrorPopup, setActiveErrorPopup] = useState({ state : false , message :'' })
    const [ActiveSuccessPopup, setActiveSuccessPopup] = useState({ state : false , message :'' })
    const [commonLoaderFv, setcommonLoaderFv] = useState(false)
    return (
        <AppContext.Provider value={{
            loading,
            setLoading,
            ActivePopup,
            setActivePopup,
            ActiveErrorPopup,
          setActiveErrorPopup,
          ActiveSuccessPopup,
           setActiveSuccessPopup,
           commonLoaderFv,
            setcommonLoaderFv
           
        }} >
            {children}
        </AppContext.Provider>
    )
}
export const EVENTS = {
    ON_GOING_CHALLENGE_MENU_PRESSED: 'on going menu pressed',
    NEW_MESSAGE: 'new message'
}

