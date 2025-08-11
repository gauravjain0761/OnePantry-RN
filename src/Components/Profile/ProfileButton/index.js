import React from 'react';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../../Constant';
import useStyle from './styles';

const ProfileButton = props => {
  const styles = useStyle();
  const {title, onPress = () => undefined, isBank = false} = props;
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
      activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
      <Image
        source={isBank ? Images.editAccount : Images.rightArrow}
        resizeMode="contain"
        style={styles.icon}
      />
    </TouchableOpacity>
  );
};
export default ProfileButton;
