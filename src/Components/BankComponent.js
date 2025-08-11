import { View, Text,StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { hp, wp } from './Config'
const BankComponent = ({title,name,setname,edit}) => {
  return (
    <View style={styles.mainView}>
  <Text style={styles.textTitle}>{title}</Text>
  <TextInput
        style={styles.editView}
        onChangeText={setname}
        value={name}
        />  
  </View>
  )
}

export default BankComponent
const styles = StyleSheet.create({
    mainView:{
        width:wp(90),
        backgroundColor:'#FBFBFB',
        height:hp(9.4),
        alignSelf:'center',
        borderRadius:5,
        padding:19,
        justifyContent:'center',
        marginTop:10,
        elevation:2
    },
    editView:{
      height:hp(5),
      width:wp(83),

    },
    textTitle:{
        fontWeight:'400',
        fontSize:12,
        color:'#808080',
      
    },
    textValue:{
        fontWeight:'400',
        fontSize:14,
        color:'#242424'
    },

})