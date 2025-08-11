import { View, Text } from 'react-native'
import React from 'react'
import BackComponent from '../../Components/BackComponent'
import { TEXT } from '../../Constant/Images'
const PrivacyPolicy = () => {
  return (
    <View style={{flex:1}}>
    <BackComponent text={'Privacy Policy'}/>
    <View style={{justifyContent:'center'}}>
      <Text style={{textAlign:"center" ,  fontSize:18 , fontWeight:'500',color:"#56AB2F"}}>onePantry</Text>
      <View style={{padding:30}}>
    <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.6)',fontWeight:'500',marginTop:5}}>{TEXT.PrivacyPolicy1}</Text>
    <Text style={{fontSize:14,ccolor:'rgba(0, 0, 0, 0.6)',fontWeight:'500',marginTop:5}}>{TEXT.PrivacyPolicy2}</Text>
    <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.6)',fontWeight:'500',marginTop:5}}>{TEXT.PrivacyPolicy3}</Text>
    <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.6)',fontWeight:'500',marginTop:5}}>{TEXT.PrivacyPolicy4}</Text>
    <Text style={{fontSize:14,color:'rgba(0, 0, 0, 0.6)',fontWeight:'500',marginTop:5}}>Contact: Privacy Officer{"\n"}
Email: test@gmail.com{"\n"}
Office: test St, San Francisco, CA 94103</Text>

   </View>

</View>
</View>
  )
}

export default PrivacyPolicy