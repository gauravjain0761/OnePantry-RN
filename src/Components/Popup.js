import React ,{useContext, useState} from 'react';
import { Modal, TouchableOpacity, View, Text,StyleSheet,Image ,logout} from 'react-native';
import { COLORS,IMAGE } from '../Constant/Images';
import { AppContext } from '../Providers/AppProvider';
const Popup = ({ visible, onClose, title, message, buttonText,image ,buttonstyle,style}) => {
    const [close, setclose] = useState(false)
    const{ActivePopup,setActivePopup} = useContext(AppContext)
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={[styles.container,style]}>

        <View style={styles.innerContainer}>
            {/* <TouchableOpacity onPress={()=>setActivePopup(false)}   style={{alignSelf:'flex-end',padding:7}}>
            <Image source={IMAGE.Delete} resizeMode='contain' style={{ height: 20, width: 20,}} />
            </TouchableOpacity> */}

         <Image source={image} resizeMode='contain' style={{ height: 60, width: 60,marginBottom:15 }} />

          <Text style={styles.title}>{title}</Text>
       {message == null ? null :   <Text style={styles.message}>{message}</Text>}
       <View style={{flexDirection:'row'}}>
       {title == 'Log Out?' ?  <TouchableOpacity style={[styles.button,{buttonstyle,backgroundColor:'#535763',marginRight:10}]} onPress={()=>setActivePopup(false)}>
            <Text style={styles.buttonText}>{'Cancel'}</Text>
          </TouchableOpacity> :null }
       <TouchableOpacity style={[styles.button,{buttonstyle}]} onPress={onClose}>
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>
      
       </View>
         
        </View>
      </View>
    </Modal>
  );
};

export default Popup
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
    padding: 20,
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
  // shadowColor: '#000',
  
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    color:'#454545'
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color:'#626262'
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
