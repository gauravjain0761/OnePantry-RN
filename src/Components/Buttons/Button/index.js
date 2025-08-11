import React from 'react';
import {Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import {colors} from '../../../Constant';
import useStyle from './styles';

const Button = ({title, style, color, onPress, loader, disabled = false}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, style]}>
      {loader ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={[styles.text, color]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default Button;
