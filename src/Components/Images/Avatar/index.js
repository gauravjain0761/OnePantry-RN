import React from 'react';
import {isEmpty} from 'lodash';
import {Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../../Constant';
import useAvatar from './useAvatar';
import useStyle from './styles';

const Avatar = props => {
  const styles = useStyle();
  const {
    containerStyle = {},
    imageStyle = {},
    iconStyle = {},
    disabled = false,
    image = '',
    onPress,
  } = props;
  const {user, onCameraHandler} = useAvatar({onPress});
  const {firstName = ''} = user ?? {};
  if (isEmpty(image)) {
    return (
      <TouchableOpacity
        disabled={disabled}
        style={[styles.initialContainer, containerStyle]}
        onPress={onCameraHandler}>
        <Text style={styles.initialText}>{firstName?.charAt(0)}</Text>
        {!disabled && (
          <Image style={[styles.camera, iconStyle]} source={Images.camera} />
        )}
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.imageContainer, containerStyle]}
      disabled={disabled}
      onPress={onCameraHandler}>
      <Image source={{uri: image}} style={[styles.image, imageStyle]} />
      {!disabled && (
        <Image style={[styles.camera, iconStyle]} source={Images.camera} />
      )}
    </TouchableOpacity>
  );
};
export default Avatar;
