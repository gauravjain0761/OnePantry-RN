import { View, Text, TouchableOpacity,StyleSheet ,Image,Pressable} from 'react-native'
import React ,{useState,useContext} from 'react'
import { IMAGE ,COLORS} from '../Constant/Images'
import { Dropdown } from 'react-native-element-dropdown';
import { SellerContext } from '../Providers/SellerProvider';

const DropDownSecond = ({placeholder,value,setValue,cdata,sdata,ddata}) => {
    const data = [
        { label: 'Go Shippo', value: 'Go Shippo' },
      
      ];
     // const [value, setValue] = useState(null);
        const [isFocus, setIsFocus] = useState(false);
        const [productId, setProductId] = useState("");
        const {API_SELLER,CategoryList,stateData,countryData, setcatValue_id} = useContext(SellerContext);
      console.log(CategoryList,'CategoryListCategoryListCategoryList')


  return (
    <View style={styles.container}>
      
      <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: COLORS.Green }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={cdata ? countryData : sdata ?stateData : data }
          itemTextStyle={{color:'black'}}
        
          maxHeight={300}
          labelStyle = {{
            fontSize: 15,
            color:'black'
          }}
          labelField= {cdata ? "name" : sdata ? "name" :'label' }
          valueField={cdata ?"id" :sdata ? "id" :'value'}
          placeholder={!isFocus ? placeholder : '...'}
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            cdata ?  setValue(item.id):sdata ? setValue(item.id) : setValue(item.value)
            //onChange(item)
            setIsFocus(false);
          }}
  
        />

        
      </View>
  )
}

export default DropDownSecond
const styles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
      },
      dropdown: {
       
        borderRadius: 35,
        padding:10,
        // color:"black",
        width:'100%',
        marginBottom:11.5,
          borderWidth:1, 
        borderColor:'#E5E5E5',
          backgroundColor:'#FAFAFA',
      },
      icon: {
        marginRight: 5,
        color:"black"
      },
      
      placeholderStyle: {
        marginLeft:5,
        fontSize: 14,
        color:"lightgrey",
       
      },
      selectedTextStyle: {
        marginLeft:5,
        fontSize: 14,
        color:"black"
      },
      iconStyle: {
        width: 28,
        height: 20,
        // color:"black"
      },
    
    });