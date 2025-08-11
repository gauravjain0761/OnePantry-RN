import { View, StyleSheet, Image, Dimensions, Text, TouchableOpacity } from 'react-native'
import React, { useState, useContext } from 'react'
import { IMAGE, COLORS, TEXT } from '../Constant/Images/index'
import InputText from '../Components/InputText'
import { useForm } from 'react-hook-form';
import { hp, wp } from './Config';
import { useNavigation } from '@react-navigation/native';
import { HomeContext } from '../Providers/HomeProvider';
const { width, height } = Dimensions.get('window');
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Filter from './FilterComponent';

const SearchComponent = ({ onPress, style, styleView, TouchFn, returnKeyType, onSubmitEditing, textInputProps, controllerProps,saller }) => {
  const windowHeight = Dimensions.get('window').height;
  const navigation = useNavigation();
  const [show, setShow] = useState(false)

  return (
    <View style={[styles.mainView, styleView]}>
      {TouchFn ?
        <TouchableOpacity onPress={() => navigation.navigate('Search')} style={[styles.touchStyyle]}>
          <Image source={IMAGE.Search} style={{ height: 20, width: 20, marginHorizontal: 10 }} />
          <Text style={{ marginLeft: wp(1), color: "#A5A7AC" }}>{'Search'}</Text>
        </TouchableOpacity>
        :
        <InputText
          label={' Search '}
          textInputProps={textInputProps}
          controllerProps={controllerProps}
          image={IMAGE.Search}
          style={[styles.inputStyle, style]}
          returnKeyType={returnKeyType}
          onSubmitEditing={onSubmitEditing}
        />
      }
      {/* <TextInput value={search} onChange={setsearch} placeholder={'Search'} image={IMAGE.Search} style={[styles.inputStyle,style]} KeyboardType={'default'} /> */}
      <TouchableOpacity onPress={() => {
        if (onPress) {
          onPress()
        }
        setShow(true)
      }
      }>
        <Image source={saller ? IMAGE.filtersaller:IMAGE.Filter} resizeMode='contain' style={{ width: 37, height: 37 , marginRight:saller ?15:null }} />
      </TouchableOpacity>

    </View>


  )
}

export default SearchComponent
const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: "space-around",
    paddingVertical: 8,
    width: width / 1.1,
    marginLeft: 15,
    alignSelf: 'center'
  },
  inputStyle: {
    borderColor: COLORS.Green,
    borderRadius: 13,
    height: hp(5),
    width: wp(72),
  },
  touchStyyle: {
    borderColor: COLORS.Green,
    borderRadius: 13,
    height: hp(5),
    width: wp(72),
    borderWidth: 1,
    // justifyContent:'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10

  },
  container: {
    flex: 1,
  },
  contentContainerStyle: {
    padding: 16,
    backgroundColor: '#F3F4F9',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  panelHandle: {
    width: 40,
    height: 2,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4
  },
  item: {
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
    alignItems: 'center',
    marginVertical: 10,
  },

})