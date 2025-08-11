import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import useStyle from './styles';

const SocialButton = ({color, text, onPress}) => {
  const styles = useStyle();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: color}]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
