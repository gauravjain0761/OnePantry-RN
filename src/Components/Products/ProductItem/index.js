import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {Images} from '../../../Constant';
import useStyle from './styles';

const ProductItem = props => {
  const styles = useStyle();
  const {
    image,
    title = '',
    address,
    value,
    containerStyle = {},
    titleStyle = {},
    valueStyle = {},
    titleTwoValue,
    onPressLike,
    onPress,
    like,
  } = props;
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {image ? (
        <TouchableOpacity onPress={onPressLike}>
          <Image
            style={like ? styles.likedImage : styles.likeImage}
            source={like ? Images.liked : Images.like}
          />
        </TouchableOpacity>
      ) : address ? (
        <TouchableOpacity onPress={onPress} style={styles.addressContainer}>
          <Text style={styles.address}>{titleTwoValue}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={onPress} style={styles.valueContainer}>
          <Text style={[styles.value, valueStyle]}>{value}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProductItem;
