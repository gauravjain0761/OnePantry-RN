import React, { useContext,useState } from 'react';
import {View,Modal,StyleSheet,TouchableOpacity,Text,Image} from 'react-native';
import { COLORS,IMAGE } from '../Constant/Images';
import { AppContext } from '../Providers/AppProvider';

export const SuccessPopup = ({}) => {
    const [close, setclose] = useState(false)
    const{ActiveSuccessPopup, setActiveSuccessPopup} = useContext(AppContext)
  return (
    <Modal animationType="fade" transparent={true} visible={ActiveSuccessPopup.state}>
      <View style={[styles.container]}>
  
        <View style={styles.innerContainer}>
            <View style={{flexDirection:'row',width:'100%',alignItems:'center'}}>
            <Image source={IMAGE.Errorpopup} resizeMode='contain' style={{ height: 25, width: 25 ,marginRight:20}} />
            { ActiveSuccessPopup.message == null ? <Text style={styles.title}>{'Something Went Wrong!'}</Text>:<Text style={styles.title}>{'Error'}</Text>}
            <TouchableOpacity onPress={()=>setActiveErrorPopup({state:false})} style={{right:0,position:'absolute'}} >
            <Image source={IMAGE.crosspopup} resizeMode='contain' style={{ height: 25, width: 25,}} />
  
            </TouchableOpacity>
  
            </View>
            {ActiveSuccessPopup.message == null ? <Text style={styles.message}>{'Please Try Again Later'}</Text> :   <Text style={styles.message}>{ActiveSuccessPopup.message}</Text>}
  
      
  
         
        </View>
      </View>
    </Modal>
  );
  };
  
  
  const styles = StyleSheet.create({
    container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // 'rgba(0, 0, 0, 0.5)',
  },
  innerContainer: {
    width: '88%',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#FAEAEA',
   // alignItems: 'center',
    borderTopWidth:4,
    borderColor:'#D21C1C'
  
  // shadowColor: '#000',
  
  },
  title: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 4,
    color:'#252A31',
    fontSize:14,
    
  },
  message: {
    fontSize: 16,
    marginBottom: 10,
    //textAlign: 'center',
    color:'#626262',
   // marginTop:10,
    fontSize:12,
    marginLeft:45
  },
  button: {
    backgroundColor: COLORS.Green,
    padding: 10,
    borderRadius: 25,
    marginBottom:10,
    paddingHorizontal:30,
    marginTop:10
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  })
  

