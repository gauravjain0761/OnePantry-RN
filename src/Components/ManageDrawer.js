import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native'
import React, { useState } from 'react'
import { COLORS, IMAGE } from '../Constant/Images'
import { DrawerItem } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'


const ManageDrawer = ({item}) => {
    const navigation = useNavigation()
    console.log(item , "dlkfjdklsfkljfdgajfkldsajf")
    const [focused, setfocused] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)


   

    const OnpressFn = (item) => {
        console.log("item_____ data_____dhjfdksf======>", item)
if(item.name === "Add Item"){
    navigation.navigate("SellerStack", { screen: "SaleItem"})
}
        // setfocused(index)
        // item.name == 'Logout' ? Logout() : 
      }
    return(
<View
// key={index}
style={{}}>


<DrawerItem
  label={item.name}
  labelStyle={{ color:'#535763F2', fontSize: 16, fontWeight: '700', opacity: true? null : .5 }}
  style={{ height: 55, backgroundColor: "#fff", borderRadius: 12 }}
  icon={({ }) => (
    false?
      <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 40, }} source={item.logoActive} />
      : <Image style={{ width: 22, height: 22, marginRight: -15, resizeMode: 'contain', marginLeft: 40, }} source={item.logo} />
   
  )}



  onPress={() => OnpressFn(item)}

//   onPress={() => {
//     item.onpress == '1'
//       ? Logout(props)
//       : item.onpress == '2'? LearnApi(props):item.onpress==3?  navigation.navigate(item.stack, {screen: item.root,params:1}):item.onpress=='4'?SwitchLocation() : navigation.navigate(item.stack, {screen: item.root});
//   }}
/>

</View>
    )
  }

  export default ManageDrawer;