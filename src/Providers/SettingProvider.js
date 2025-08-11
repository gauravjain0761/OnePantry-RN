import { View, Text } from 'react-native'
import React,{useState} from "react";
import { API, base_url,ERROR,LOADING } from './index';
export const SettingContext = React.createContext()

const SettingProvider = ({children}) => {
    const [countryData, setcountryData] = useState('')
    
    const API_SETTING = {
        CountryList: async (params,onSuccess) => await API.get('getCountry', params).then(res => { console.log(res.data) ,setcountryData(res.data.data)}),

    }
    
      return (
        <SettingContext.Provider value={{
            API_SETTING,
            countryData,
            setcountryData
        }}  >
         
            {children}
        </SettingContext.Provider>
      )
}

export default SettingProvider