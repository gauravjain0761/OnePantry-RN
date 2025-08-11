import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import BackComponent from '../../Components/BackComponent'
import { hp, wp } from '../../Components/Config'
import { IMAGE ,COLORS} from '../../Constant/Images'
import Button from '../../Components/Button'
class RowLayout extends React.PureComponent {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress} style={{ justifyContent: 'space-between', paddingHorizontal: wp(5), alignItems: 'center', flexDirection: 'row', borderColor: '#E9ECEF', height: 57, borderBottomWidth: 1, ...this.props.style }}>
        <Text style={{ fontWeight: '600', color: 'rgba(83, 87, 99, 0.7)' }} >{this.props.title}</Text>
        <Image source={IMAGE.right_arrow} style={{ height: 16, width: 16, resizeMode: 'contain' }} />
      </TouchableOpacity>
    )
  }
}


const Settings = ({navigation}) => {
  const navigateScreen = (item)=>{
    navigation.navigate('SettingStack',{screen:item})
  }
  return (
    <View style={{ flex: 1 }}>
      <BackComponent text={'Settings'}  />
      <View style={{flex: 1,paddingHorizontal:wp(6)}}>
      <View style={{ marginTop: hp(4), overflow: 'hidden', borderWidth: 1, borderColor: '#E9ECEF', borderRadius: 5 ,justifyContent:'space-between'}}>
        <ScrollView>
        {/* <RowLayout onPress={()=>{navigateScreen('AddAddress')}} title='My Address' />
          <RowLayout onPress={()=>navigation.navigate('followers')} title='Followers' />
          <RowLayout onPress={()=>{}} title='Past Order' />
          <RowLayout onPress={()=>{navigateScreen('Review')}} title='Reviews' /> */}
          <RowLayout onPress={()=>{navigateScreen('FAQ')}} title='FAQ' />
          {/* <RowLayout onPress={()=>{}} title='Notifications' /> */}
          <RowLayout onPress={()=>{navigateScreen('PrivacyPolicy')}} title='Privacy Policy' />        
          <RowLayout onPress={()=>{navigateScreen('AboutUs')}} title='About Us' />
          <RowLayout onPress={()=>{navigateScreen('ContactUs')}} title='Contact Us' />

          {/* <RowLayout onPress={()=>{}} title='Change Password' style={{ marginBottom: -2 }} /> */}
        </ScrollView>

      </View>
      <Button title={'Delete Account'} style={{  marginTop:-30 ,marginBottom:0,backgroundColor:'#D6281D',borderRadius:35,width:'100%',marginTop:hp(17),elevation:7}} color={{color:'#fff'}}  />
      </View>

    </View>
  )
}

export default Settings


{/* <View style={{ flex: 1, justifyContent: 'center' }}>
        <Text style={{ fontSize: 20, color: '#56AB2F', fontWeight: '500', textAlign: 'center', marginTop: 5 }}>IN PROGRESS</Text>
      </View> */}


// import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
// import React from 'react'
// import BackComponent from '../../Components/BackComponent'
// import { hp, wp } from '../../Components/Config'
// import { IMAGE } from '../../Constant/Images'

// class RowLayout extends React.PureComponent {
//   render() {
//     return (
//       <TouchableOpacity onPress={this.props.onPress} style={{ justifyContent: 'space-between', paddingHorizontal: wp(5), alignItems: 'center', flexDirection: 'row', borderColor: '#E9ECEF', height: 57, borderBottomWidth: 1, ...this.props.style }}>
//         <Text style={{ fontWeight: '600', color: 'rgba(83, 87, 99, 0.7)' }} >{this.props.title}</Text>
//         <Image source={IMAGE.right_arrow} style={{ height: 16, width: 16, resizeMode: 'contain' }} />
//       </TouchableOpacity>
//     )
//   }
// }

// const Settings = ({navigation}) => {
//   return (
//     <View style={{ flex: 1 }}>
//       <BackComponent text={'Settings'} />
//       <View style={{ marginTop: hp(4), overflow: 'hidden', borderWidth: 1, borderColor: '#E9ECEF', borderRadius: 5, marginHorizontal: wp(6) }}>
//         <ScrollView>
//           <RowLayout onPress={()=>navigation.navigate('followers')} title='Followers' />
//           <RowLayout onPress={()=>{}} title='Notifications' />
//           <RowLayout onPress={()=>{}} title='Contact Us' />
//           <RowLayout onPress={()=>{}} title='Reviews' />
//           <RowLayout onPress={()=>{}} title='My Address' />
//           <RowLayout onPress={()=>{}} title='Privacy Policy' />
//           <RowLayout onPress={()=>{}} title='FAQ' />
//           <RowLayout onPress={()=>{}} title='About Us' />
//           <RowLayout onPress={()=>{}} title='Change Password' style={{ marginBottom: -2 }} />
//         </ScrollView>
//       </View>

//     </View>
//   )
// }

// export default Settings

