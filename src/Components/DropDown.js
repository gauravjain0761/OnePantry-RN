import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../Constant';

const DropDown = ({placeholder, value, setValue, data = [], isData}) => {
  const [isFocus, setIsFocus] = useState(false);
  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: colors.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        itemTextStyle={{textColor: colors.black}}
        maxHeight={300}
        labelStyle={{
          fontSize: 15,
          color: 'black',
        }}
        labelField={isData ? 'name' : 'label'}
        valueField={isData ? 'id' : 'value'}
        placeholder={!isFocus ? placeholder : 'Select'}
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          isData ? setValue(item.id) : setValue(item.value);
          setIsFocus(false);
        }}
      />
    </View>
  );
};

export default DropDown;
const styles = StyleSheet.create({
  container: {},
  dropdown: {
    borderRadius: 35,
    padding: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.mercury,
  },
  icon: {
    marginRight: 5,
    color: colors.black,
  },

  placeholderStyle: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.black,
  },
  selectedTextStyle: {
    marginLeft: 5,
    fontSize: 14,
    color: colors.black,
  },
  iconStyle: {
    width: 28,
    height: 20,
  },
  labelStyle: {
    fontSize: 15,
    color: colors.black,
  },
});
