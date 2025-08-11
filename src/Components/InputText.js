import { View, Text,StyleSheet,TextInput,Image, Keyboard, Pressable, } from 'react-native'
import React,{useState,useMemo} from 'react'
import { hp, wp } from './Config';
import {Controller} from 'react-hook-form';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { IMAGE } from '../Constant/Images';
const InputText = ({refs,label,Dropdown,placeholder,returnKeyType,numberofline,onSubmitEditing,value,onChange,image,style,imageLast,inputstyle,circle,KeyboardType,styleeye,controllerProps,rightIconProps,multiline, disabled,textInputProps, message,card,placeholderTextColor,name,type, Cvalue,Ctext,...res}) => {
  const [passwordVisible, setPasswordVisibility] = useState(false);
  const [Card, setcard] = useState('')



  const onChangeFn = (text) =>{
    let formattedCardNumber = text.replace(/\D/g, ""); // Remove non-digit characters

  // Limit the number of digits to 8
  if (formattedCardNumber.length > 8) return;

  let spacedCardNumber = "";
  for (let i = 0; i < formattedCardNumber.length; i++) {
    spacedCardNumber += formattedCardNumber[i];

    if ((i + 1) % 2 === 0 && i !== formattedCardNumber.length - 1 && i < 4) {
      spacedCardNumber += "/"; // Add slash after every 2 digits (except for the last digit and after the month)
    }
  }

  setcard(spacedCardNumber);
  };
  
  return (
    <View style={{}}>

<Controller
          {...controllerProps}
      
          render={({field: {onChange, onBlur, value }}) => (
            <>
                 <View style={[styles.inputView,style]}>

                  { image &&  <Image source={image} style={{height:20,width:20,marginHorizontal:10}}/>}

                <TextInput
                label={label}
                  editable={!disabled}
                  placeholderTextColor={placeholderTextColor ?'#242424' :'lightgrey'}
                  onBlur={onBlur}
                  onChangeText={value => {
                    !card ? onChange(value):onChangeFn(value)
                  
                }}
                 
                  value={card? Card :value}
                  {...textInputProps}
                  multiline={numberofline ? true :false}
                  numberOfLines={3}
                  autoCorrect={ false}
                  ref={refs}
                  keyboardType="default" 
                  style={[styles.MainContainer,inputstyle]}
                  secureTextEntry={rightIconProps ? !passwordVisible : false}
                  returnKeyType={returnKeyType && returnKeyType}
                  onSubmitEditing={onSubmitEditing && onSubmitEditing}
              
                />
              { circle ? 
              <View style={{flexDirection:'row'}}>
              <View style={{height:18,width:18,backgroundColor:'#F44336',borderRadius:10}}>
              <View style={{height:18,width:18,backgroundColor:'#FFC107',borderRadius:10,position:'absolute',left:10}}></View>
             </View>
             <Image source={ IMAGE.Visa} style={{height:hp(2.8),width:wp(7),marginLeft:wp(10)}}/>

              </View> 
              : null }

            {  imageLast ? 
               <Pressable  onPress={()=>setPasswordVisibility(!passwordVisible)} style={[{justifyContent:'center',alignItems:'center',right:wp(3),height:hp(5),width:wp(7)}]} >
               <Image source={ passwordVisible ? IMAGE.Show : IMAGE.ClosedEye} style={{height:hp(2),width:wp(5)}}/>
               </Pressable>
               :null}
             { Dropdown ?
               <Pressable  onPress={{}} style={[{justifyContent:'center',alignItems:'center',right:wp(-10),height:hp(5),width:wp(7)}]} >
               <Image source={IMAGE.DropDown} style={{}}/>
              </Pressable> :null}
              </View>

           
            </>
          )}
        />


             <Error
                error={controllerProps.errors[controllerProps.name]}
                label={label ? label : textInputProps.placeholder}
            />



    </View>
  )
}
const styles = StyleSheet.create({
    MainContainer :{
        width:wp(60),
        height:hp(6),
       color:'grey',
       marginLeft:5,
       marginRight:18,
      
       
    },
    inputView:{
      alignItems:'center',
      marginBottom:11.5,
      flexDirection:'row',
        borderWidth:1, 
        borderRadius:20,
      borderColor:'#E5E5E5',
       backgroundColor:'#FAFAFA',
      
    },
    img:{
      height:22,width:26,marginLeft:45
    }
 })
export default InputText

export const Error = ({error, label}) => {
  // Phone
    if (!error) return null;
    const capitalizeFistLetter = string =>
      string.charAt(1).toUpperCase() + string.slice(2).toLowerCase(); //.toLowerCase() i have remove it from here
    const errorText = useMemo(() => {
      if (error.type == 'pattern')
        return `Please enter a valid ${label.toLowerCase()}`;
      if (error.type == 'max') return error.message;
      if (error.type == 'min') return error.message;
      if (error.type == 'maxLength') return error.message;
      if (error.type == 'required')
        return `Required`;
    }, [error]);
  
    return (
      <Text
        style={{color: 'red', marginBottom: 15, fontSize: 15, marginTop: -8,marginLeft:10}}>
        {errorText}
      </Text>
    );
  };

export const CardInputText = ({placeholder,value,onChange,image,style,imageLast,inputstyle,circle,KeyboardType})=>{
  const [card, setcard] = useState('')
  const onChangeFn = (text) =>{
    let formattedCardNumber = text.replace(/\s/g, "");
    if (formattedCardNumber.length > 16) return;
    let spacedCardNumber = "";
    for (let i = 0; i < formattedCardNumber.length; i++) {
      spacedCardNumber += formattedCardNumber[i];
      if (i % 4 === 3 && i !== formattedCardNumber.length - 1) {
        spacedCardNumber += " ";
      }
    }
    setcard(spacedCardNumber);
  };
  
 return(
  <View style={[styles.inputView,style]}>
     <TextInput
     style={[styles.MainContainer,inputstyle]}
     onChangeText={onChangeFn}
     value={card}
     placeholder={placeholder}
     multiline={true}
     keyboardType={KeyboardType}
     onSubmitEditing={() => {
     
  }}
 
   />
   { circle ?  <View style={{height:hp(2),width:wp(4),backgroundColor:'#F44336',borderRadius:10,}}>
   <View style={{height:hp(2),width:wp(4),backgroundColor:'#FFC107',borderRadius:10,position:'absolute',left:wp(2)}}></View>
 </View>: null}

 {  imageLast ?  <Image source={imageLast} style={{height:hp(3),width:wp(7),marginLeft:wp(8)}}/> :null}
    </View>
 )
}

