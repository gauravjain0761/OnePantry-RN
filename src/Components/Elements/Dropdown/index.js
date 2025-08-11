import React, {useState} from 'react';
import {View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {colors} from '../../../Constant';
import useStyle from './styles';

const DropDown = props => {
  const styles = useStyle();
  const [isFocus, setIsFocus] = useState(false);
  const {placeholder, value, setValue, data = [], isData} = props;

  return (
    <View style={styles.container}>
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: colors.primary}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        iconStyle={styles.iconStyle}
        data={data}
        itemTextStyle={styles.itemTextStyle}
        maxHeight={300}
        labelStyle={styles.label}
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
